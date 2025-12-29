import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "./AdminLayout";
import styles from "./AdminDashboard.module.scss";
import { useNavigate } from "react-router-dom";
import Eye from "../../assets/images/icons/admineye.svg";

import ClientCardModal, {
  ClientCardData,
} from "./components/ClientCardModal/ClientCardModal";

import {
  AdminClient,
  getAdminClientById,
  getAdminClients,
  deleteAdminClient,
  blockAdminClient,
  unblockAdminClient,
} from "../../api/adminClients";

const PAGE_SIZE = 6;

const mapToCardData = (c: AdminClient): ClientCardData => ({
  id: c.id,
  name: c.fullName || c.username || c.email || `Client #${c.id}`,
  phone: c.username || "",
  city: c.city || "",
  address: c.address || "",
  ordersCount: 0,
  avatarUrl: c.avatarUrl,
});

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

type ActionType = "active" | "inactive" | "delete" | null;

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageData, setPageData] = useState<AdminClient[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // search
  const [search, setSearch] = useState("");

  // filter (City)
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedCities, setAppliedCities] = useState<string[]>([]);
  const [draftCities, setDraftCities] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement | null>(null);

  // modal state
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientCardData | null>(
    null
  );

  // selection (checkbox)
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // reload tick + navigate
  const [reloadTick, setReloadTick] = useState(0);
  const navigate = useNavigate();

  // choose action dropdown
  const [actionOpen, setActionOpen] = useState(false);
  const [action, setAction] = useState<ActionType>(null);
  const actionRef = useRef<HTMLDivElement | null>(null);

  const clientsOnPage = useMemo(() => pageData.map(mapToCardData), [pageData]);

  const cityOptions = useMemo(() => {
    const set = new Set<string>();
    clientsOnPage.forEach((c) => {
      if (c.city?.trim()) set.add(c.city.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [clientsOnPage]);

  const filteredClients = useMemo(() => {
    const q = norm(search);
    const citiesSet = new Set(appliedCities.map((c) => c.trim()));

    return clientsOnPage.filter((c) => {
      // city filter
      if (citiesSet.size > 0) {
        if (!c.city?.trim() || !citiesSet.has(c.city.trim())) return false;
      }

      // search
      if (!q) return true;
      const hay = [c.name, c.phone, c.city, c.address].filter(Boolean).join(" ");
      return norm(hay).includes(q);
    });
  }, [clientsOnPage, appliedCities, search]);

  // ---------- load page ----------
  const loadPage = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAdminClients(currentPage - 1, PAGE_SIZE);
      setPageData(data.content || []);
      setTotalPages(Math.max(1, data.totalPages || 1));
      setSelectedIds([]);
    } catch (e: any) {
      setError(e?.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  // reloadTick
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (cancelled) return;
      await loadPage();
    })();

    return () => {
      cancelled = true;
    };
  }, [currentPage, reloadTick]);

  // close filter on outside click / Esc
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterOpen(false);
      if (actionRef.current && !actionRef.current.contains(e.target as Node))
        setActionOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFilterOpen(false);
        setActionOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // pagination
  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePage = (page: number) => setCurrentPage(page);

  // modal open
  const openClientCard = async (id: number) => {
    try {
      const full = await getAdminClientById(id);
      setSelectedClient(mapToCardData(full));
      setIsCardOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const closeClientCard = () => {
    setIsCardOpen(false);
    setSelectedClient(null);
  };

  // Delete handler (reloadTick)
    const handleDeleteClient = async (id: number) => {
    try {
      await deleteAdminClient(id);
      closeClientCard();
      setReloadTick((v) => v + 1); 
    } catch (e) {
      console.error(e);
      setError("Failed to delete client");
    }
  };

// Edit handler (navigate)
  const handleEditClient = () => {
    if (!selectedClient) return;
    closeClientCard();
    navigate(`/admin/clients/${selectedClient.id}/edit`);
  };


  const handleRowClick = (e: React.MouseEvent, id: number) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("a"))
      return;
    openClientCard(id);
  };

  // ---------- filter helpers ----------
  const toggleCity = (city: string) => {
    setDraftCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
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

  const clearFilter = () => {
    setDraftCities([]);
    setAppliedCities([]);
    setSelectedIds([]);
  };

  // ---------- selection ----------
  const allChecked =
    filteredClients.length > 0 && selectedIds.length === filteredClients.length;

  const toggleSelectAll = () => {
    if (allChecked) setSelectedIds([]);
    else setSelectedIds(filteredClients.map((c) => c.id));
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ---------- action dropdown ----------
  const applyAction = async () => {
    if (!action) {
      setActionOpen(false);
      return;
    }
    if (selectedIds.length === 0) {
      alert("Select clients first");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (action === "delete") {
        const ok = window.confirm("Delete selected clients?");
        if (!ok) return;
        await Promise.all(selectedIds.map((id) => deleteAdminClient(id)));
      }

      if (action === "inactive") {
        await Promise.all(selectedIds.map((id) => blockAdminClient(id)));
      }

      if (action === "active") {
        await Promise.all(selectedIds.map((id) => unblockAdminClient(id)));
      }

      setAction(null);
      setActionOpen(false);
      setReloadTick((v) => v + 1);
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const cancelAction = () => {
    setActionOpen(false);
  };

  return (
    <AdminLayout>
      <section className={styles.topBar}>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>Clients</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink}>Home</span> /{" "}
            <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <span className={styles.breadcrumbActive}>Clients</span>
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
              <button
                type="button"
                className={styles.select}
                onClick={() => (filterOpen ? setFilterOpen(false) : openFilter())}
              >
                <span className={styles.selectText}>Filter</span>
                <span className={styles.selectIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 5H3L8 10L13 5Z" fill="#495057" />
                  </svg>
                </span>
              </button>

              {filterOpen && (
                <div className={styles.filterDropdown}>
                  <div className={styles.filterHead}>Filter</div>

                  <div className={styles.filterSectionTitle}>Город</div>
                  <div className={styles.filterList}>
                    {cityOptions.length === 0 && (
                      <div className={styles.filterEmpty}>
                        Нет городов на этой странице
                      </div>
                    )}

                    {cityOptions.map((city) => (
                      <label key={city} className={styles.filterItem}>
                        <input
                          type="checkbox"
                          checked={draftCities.includes(city)}
                          onChange={() => toggleCity(city)}
                        />
                        <span>{city}</span>
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterActions}>
                    <button
                      type="button"
                      className={styles.filterCancel}
                      onClick={cancelFilter}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.filterApply}
                      onClick={applyFilter}
                    >
                      Apply
                    </button>
                  </div>

                  {(appliedCities.length > 0 || draftCities.length > 0) && (
                    <button
                      type="button"
                      className={styles.filterClear}
                      onClick={clearFilter}
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CHOOSE ACTION */}
            <div className={styles.actionWrap} ref={actionRef}>
              <button
                type="button"
                className={styles.select}
                onClick={() => setActionOpen((v) => !v)}
              >
                <span className={styles.selectText}>Choose action</span>
                <span className={styles.selectIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 5H3L8 10L13 5Z" fill="#495057" />
                  </svg>
                </span>
              </button>

              {actionOpen && (
                <div className={styles.actionDropdown}>
                  <div className={styles.actionHead}>Choose Action</div>

                  <label className={styles.actionItem}>
                    <input
                      type="checkbox"
                      checked={action === "active"}
                      onChange={() =>
                        setAction((prev) => (prev === "active" ? null : "active"))
                      }
                    />
                    <span>Active</span>
                  </label>

                  <label className={styles.actionItem}>
                    <input
                      type="checkbox"
                      checked={action === "inactive"}
                      onChange={() =>
                        setAction((prev) =>
                          prev === "inactive" ? null : "inactive"
                        )
                      }
                    />
                    <span>Inactive</span>
                  </label>

                  <label className={styles.actionItem}>
                    <input  type="checkbox"  checked={action === "delete"}  onChange={() =>  setAction((prev) => (prev === "delete" ? null : "delete"))}/>
                    <span className={styles.actionDelete}>Delete</span>
                  </label>

                  <div className={styles.actionActions}>
                    <button  type="button"  className={styles.actionCancel}  onClick={cancelAction}>
                      Cancel
                    </button>
                    <button  type="button"  className={styles.actionApply}  onClick={applyAction}>
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
          {error && (
            <div style={{ padding: 12, color: "crimson" }}>{error}</div>
          )}

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCol}>
                  <input  type="checkbox"  checked={allChecked}  onChange={toggleSelectAll}/>
                </th>

                <th>
                  <span className={styles.thWithSort}>  Name <span className={styles.sortIcon}>▾</span></span>
                </th>

                <th>
                  <span className={styles.thWithSort}>  Number <span className={styles.sortIcon}>▾</span></span>
                </th>

                <th>
                  <span className={styles.thWithSort}>  City <span className={styles.sortIcon}>▾</span></span>
                </th>

                <th>
                  <span className={styles.thWithSort}>  Address <span className={styles.sortIcon}>▾</span></span>
                </th>

                <th>
                  <span className={styles.thWithSort}> Orders <span className={styles.sortIcon}>▾</span></span>
                </th>

                <th>
                  <span className={styles.thWithSort}> Order History <span className={styles.sortIcon}>▾</span></span>
                </th>

                <th className={styles.eyeCol}></th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className={styles.clickableRow} onClick={(e) => handleRowClick(e, client.id)}>
                  <td className={styles.checkboxCol}>
                    <input type="checkbox" checked={selectedIds.includes(client.id)} onChange={() => toggleSelectOne(client.id)} onClick={(e) => e.stopPropagation()}/>
                  </td>
                  
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.city}</td>
                  <td className={styles.addressCell}>{client.address}</td>
                  <td>—</td>
                  <td>
                    <button className={styles.viewLink} onClick={(e) => { e.stopPropagation(); openClientCard(client.id);}} type="button">
                       View <span className={styles.viewArrow}>›</span>
                    </button>
                  </td>

                  <td className={styles.eyeCol}>
                    <button
                      className={styles.eyeButton}
                      title="View client"
                      onClick={(e) => {
                        e.stopPropagation();
                        openClientCard(client.id);
                      }}
                      type="button"
                    >
                      <img src={Eye} alt="eye" />
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && filteredClients.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: 16, color: "#667085" }}>
                    No clients
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className={styles.pagination}>
          <button className={styles.paginationButton} onClick={handlePrev} disabled={currentPage === 1} type="button">
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={`${styles.paginationButton} ${
                  currentPage === page ? styles.pageActive : ""
                }`}
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
      <ClientCardModal
        open={isCardOpen}
        client={selectedClient}
        onClose={closeClientCard}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}/>
    </AdminLayout>
  );
};

export default AdminDashboard;