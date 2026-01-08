import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../AdminLayout";
import styles from "./AdminEstablishmentsPage.module.scss";
import Eye from "../../../assets/images/icons/admineye.svg";

import { AdminRestaurant, getAdminRestaurants } from "../../../api/adminRestaurants";

const PAGE_SIZE = 6;

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

type Row = {
  id: number;
  name: string;
  phone: string;
  city: string;
  ordersCount: number;
};

const mapToRow = (r: AdminRestaurant): Row => ({
  id: r.id,
  name: r.title || `Restaurant #${r.id}`,
  phone: r.phone || "",
  city: r.city || r.address?.city || "",
  ordersCount: r.ordersCount ?? 0,
});

const AdminEstablishmentsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageData, setPageData] = useState<AdminRestaurant[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  // filter city
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedCities, setAppliedCities] = useState<string[]>([]);
  const [draftCities, setDraftCities] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement | null>(null);

  // selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const rowsOnPage = useMemo(() => pageData.map(mapToRow), [pageData]);

  const cityOptions = useMemo(() => {
    const set = new Set<string>();
    rowsOnPage.forEach((c) => c.city?.trim() && set.add(c.city.trim()));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [rowsOnPage]);

  const filteredRows = useMemo(() => {
    const q = norm(search);
    const citiesSet = new Set(appliedCities.map((c) => c.trim()));

    return rowsOnPage.filter((r) => {
      if (citiesSet.size > 0) {
        if (!r.city?.trim() || !citiesSet.has(r.city.trim())) return false;
      }

      if (!q) return true;
      const hay = [r.name, r.phone, r.city].filter(Boolean).join(" ");
      return norm(hay).includes(q);
    });
  }, [rowsOnPage, appliedCities, search]);

  const loadPage = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminRestaurants(currentPage - 1, PAGE_SIZE);
      setPageData(data.content || []);
      setTotalPages(Math.max(1, data.totalPages || 1));
      setSelectedIds([]);
    } catch (e: any) {
      setError(e?.message || "Failed to load establishments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [currentPage]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // pagination
  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePage = (page: number) => setCurrentPage(page);

  // filter helpers
  const toggleCity = (city: string) => {
    setDraftCities((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]));
  };
  const openFilter = () => {
    setDraftCities(appliedCities);
    setFilterOpen(true);
  };
  const applyFilter = () => {
    setAppliedCities(draftCities);
    setFilterOpen(false);
    setSelectedIds([]);
  };
  const cancelFilter = () => {
    setDraftCities(appliedCities);
    setFilterOpen(false);
  };

  // selection
  const allChecked = filteredRows.length > 0 && selectedIds.length === filteredRows.length;
  const toggleSelectAll = () => {
    if (allChecked) setSelectedIds([]);
    else setSelectedIds(filteredRows.map((c) => c.id));
  };
  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <AdminLayout>
      <section className={styles.topBar}>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>Establishments</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink}>Home</span> /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <span className={styles.breadcrumbActive}>Establishments</span>
          </div>
        </div>

        <div className={styles.controlsBlock}>
          <input
            className={styles.searchInput}
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.actionsRow}>
            {/* FILTER */}
            <div className={styles.filterWrap} ref={filterRef}>
              <button type="button" className={styles.select} onClick={() => (filterOpen ? setFilterOpen(false) : openFilter())}>
                <span className={styles.selectText}>Filter</span>
                <span className={styles.selectIcon}>▾</span>
              </button>

              {filterOpen && (
                <div className={styles.filterDropdown}>
                  <div className={styles.filterHead}>Filter</div>

                  <div className={styles.filterSectionTitle}>City</div>
                  <div className={styles.filterList}>
                    {cityOptions.map((city) => (
                      <label key={city} className={styles.filterItem}>
                        <input type="checkbox" checked={draftCities.includes(city)} onChange={() => toggleCity(city)} />
                        <span>{city}</span>
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterActions}>
                    <button type="button" className={styles.filterCancel} onClick={cancelFilter}>
                      Cancel
                    </button>
                    <button type="button" className={styles.filterApply} onClick={applyFilter}>
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className={styles.applyButton} type="button">
              Apply
            </button>
          </div>
        </div>
      </section>

      <section className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          {loading && <div style={{ padding: 12 }}>Loading...</div>}
          {error && <div style={{ padding: 12, color: "crimson" }}>{error}</div>}

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCol}>
                  <input type="checkbox" checked={allChecked} onChange={toggleSelectAll} />
                </th>
                <th>Name</th>
                <th>Phone number</th>
                <th>City</th>
                <th>Number of orders</th>
                <th>Categories</th>
                <th>Positions</th>
                <th>Order history</th>
                <th className={styles.eyeCol}></th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((r) => (
                <tr key={r.id} className={styles.clickableRow}>
                  <td className={styles.checkboxCol}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(r.id)}
                      onChange={() => toggleSelectOne(r.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>

                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.city}</td>
                  <td>{r.ordersCount}</td>

                  <td>
                    <button className={styles.viewLink} type="button">
                      View <span className={styles.viewArrow}>›</span>
                    </button>
                  </td>
                  <td>
                    <button className={styles.viewLink} type="button">
                      View <span className={styles.viewArrow}>›</span>
                    </button>
                  </td>
                  <td>
                    <button className={styles.viewLink} type="button">
                      View <span className={styles.viewArrow}>›</span>
                    </button>
                  </td>

                  <td className={styles.eyeCol}>
                    <button className={styles.eyeButton} type="button">
                      <img src={Eye} alt="eye" />
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && filteredRows.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ padding: 16, color: "#667085" }}>
                    No establishments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.paginationButton} onClick={handlePrev} disabled={currentPage === 1} type="button">
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={`${styles.paginationButton} ${currentPage === page ? styles.pageActive : ""}`}
                onClick={() => handlePage(page)}
                type="button"
              >
                {page}
              </button>
            );
          })}

          <button className={styles.paginationButton} onClick={handleNext} disabled={currentPage === totalPages} type="button">
            Next
          </button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminEstablishmentsPage;
