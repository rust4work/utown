import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AdminLayout from "../AdminLayout";
import styles from "./AdminEstablishmentsPage.module.scss";
import {
  AdminRestaurant,
  deleteAdminRestaurant,
  getAdminRestaurants,
  updateAdminRestaurant,
} from "../../../api/adminRestaurants";
import EstablishmentCardModal from "../../Admin/components/EstablishmentCardModal/EstablishmentCardModal";

type ActionType = "ACTIVE" | "INACTIVE" | "DELETE" | null;

const AdminEstablishmentsPage: React.FC = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<AdminRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const size = 10;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [actionOpen, setActionOpen] = useState(false);
  const [chosenAction, setChosenAction] = useState<ActionType>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<AdminRestaurant | null>(null);

  const actionRef = useRef<HTMLDivElement | null>(null);

  const totalSelected = selectedIds.length;

  const allChecked = useMemo(() => {
    if (!rows.length) return false;
    return rows.every((r) => selectedIds.includes(r.id));
  }, [rows, selectedIds]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAdminRestaurants(page, size);
        if (cancelled) return;

        setRows(data.content || []);
        setSelectedIds([]);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load restaurants");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!actionOpen) return;
      const el = actionRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setActionOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [actionOpen]);

  const toggleAll = () => {
    if (allChecked) setSelectedIds([]);
    else setSelectedIds(rows.map((r) => r.id));
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const openDetails = (r: AdminRestaurant) => {
    setActiveRestaurant(r);
    setDetailsOpen(true);
  };

  const goToPositions = (restaurantId: number) => {
    navigate(`/admin/establishments/${restaurantId}/positions`);
  };

  const goToCategories = (restaurantId: number) => {
    navigate(`/admin/establishments/${restaurantId}/categories`);
  };

  const goToOrders = (restaurantId: number) => {
    navigate(`/admin/establishments/${restaurantId}/orders`);
  };

  const applyAction = async () => {
    if (!chosenAction) return;
    if (!selectedIds.length) {
      setError("Выберите хотя бы один ресторан");
      return;
    }

    setError(null);

    if (chosenAction === "DELETE") {
      setConfirmOpen(true);
      setActionOpen(false);
      return;
    }

    try {
      setLoading(true);
      const isActive = chosenAction === "ACTIVE";

      await Promise.all(selectedIds.map((id) => updateAdminRestaurant(id, { isActive })));

      const data = await getAdminRestaurants(page, size);
      setRows(data.content || []);
      setSelectedIds([]);
      setActionOpen(false);
      setChosenAction(null);
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to apply action");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await Promise.all(selectedIds.map((id) => deleteAdminRestaurant(id)));

      const data = await getAdminRestaurants(page, size);
      setRows(data.content || []);
      setSelectedIds([]);

      setConfirmOpen(false);
      setActionOpen(false);
      setChosenAction(null);
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.head}>
          <div className={styles.headBlock}>
            <h1 className={styles.title}>Establishments</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumbLink}>Home</span> /{" "}
              <span className={styles.breadcrumbLink}>Users</span> /{" "}
              <span className={styles.active}>Establishments</span>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <input className={styles.search} placeholder="Search" />
            </div>

            <div className={styles.filterRow}>
              <select className={styles.select}>
                <option>Filter</option>
              </select>

              <div className={styles.chooseActionWrap} ref={actionRef}>
                <button
                  type="button"
                  className={styles.chooseActionBtn}
                  onClick={() => setActionOpen((v) => !v)}
                >
                  Choose action{" "}
                  <span className={styles.caret}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 5H3L8 10L13 5Z" fill="#495057" />
                    </svg>
                  </span>
                </button>

                {actionOpen && (
                  <div className={styles.actionPopover}>
                    <div className={styles.actionTitle}>Choose Action</div>

                    <label className={styles.actionItem}>
                      <input
                        type="checkbox"
                        checked={chosenAction === "ACTIVE"}
                        onChange={() => setChosenAction((prev) => (prev === "ACTIVE" ? null : "ACTIVE"))}
                      />
                      <span>Active</span>
                    </label>

                    <label className={styles.actionItem}>
                      <input
                        type="checkbox"
                        checked={chosenAction === "INACTIVE"}
                        onChange={() => setChosenAction((prev) => (prev === "INACTIVE" ? null : "INACTIVE"))}
                      />
                      <span>Inactive</span>
                    </label>

                    <label className={`${styles.actionItem} ${styles.deleteItem}`}>
                      <input
                        type="checkbox"
                        checked={chosenAction === "DELETE"}
                        onChange={() => setChosenAction((prev) => (prev === "DELETE" ? null : "DELETE"))}
                      />
                      <span>Delete</span>
                    </label>

                    <div className={styles.actionFooter}>
                      <button type="button" className={styles.actionCancel} onClick={() => setActionOpen(false)}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={styles.actionApply}
                        onClick={applyAction}
                        disabled={!chosenAction || loading}
                      >
                        Apply
                      </button>
                    </div>

                    <div className={styles.hint}>
                      Selected: <b>{totalSelected}</b>
                    </div>
                  </div>
                )}
              </div>

              <button type="button" className={styles.applyBtn} onClick={applyAction} disabled={loading}>
                Apply
              </button>
            </div>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} />
                </th>
                <th>Name</th>
                <th>Phone number</th>
                <th>City</th>
                <th>Number of orders</th>
                <th>Categories</th>
                <th>Positions</th>
                <th>Order history</th>
                <th />
                <th />
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className={styles.empty}>
                    Loading...
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className={styles.checkboxCell}>
                      <input type="checkbox" checked={selectedIds.includes(r.id)} onChange={() => toggleOne(r.id)} />
                    </td>
                    <td>{r.title}</td>
                    <td>{r.phone || "—"}</td>
                    <td>{r.city || r.address?.city || "—"}</td>
                    <td>{typeof r.ordersCount === "number" ? r.ordersCount : "—"}</td>

                    <td className={styles.viewCell} onClick={() => goToCategories(r.id)} style={{ cursor: "pointer" }}>
                      View <span className={styles.chev}>›</span>
                    </td>

                    <td className={styles.viewCell} onClick={() => goToPositions(r.id)} style={{ cursor: "pointer" }}>
                      View <span className={styles.chev}>›</span>
                    </td>

                    <td className={styles.viewCell} onClick={() => goToOrders(r.id)} style={{ cursor: "pointer" }}>
                      View <span className={styles.chev}>›</span>
                    </td>

                    <td className={styles.eyeCell}>
                      <button type="button" className={styles.eyeBtn} onClick={() => openDetails(r)}>
                        👁
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className={styles.empty}>
                    No restaurants
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <EstablishmentCardModal open={detailsOpen} onClose={() => setDetailsOpen(false)} restaurant={activeRestaurant} />

        {confirmOpen && (
          <div className={styles.confirmOverlay} onMouseDown={() => setConfirmOpen(false)}>
            <div className={styles.confirmModal} onMouseDown={(e) => e.stopPropagation()}>
              <div className={styles.confirmTitle}>Удалить заведение?</div>

              <button className={styles.confirmDelete} type="button" onClick={confirmDelete} disabled={loading}>
                Удалить
              </button>

              <button className={styles.confirmCancel} type="button" onClick={() => setConfirmOpen(false)}>
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEstablishmentsPage;


