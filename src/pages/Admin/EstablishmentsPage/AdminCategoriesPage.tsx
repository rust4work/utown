import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminCategoriesPage.module.scss";
import { getAdminCategories, AdminCategory } from "../../../api/adminCategories";

type CategoryRow = {
  id: number;
  name: string;
  priority: number;
};

const AdminCategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const actionRef = useRef<HTMLDivElement | null>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [chosenAction, setChosenAction] = useState<"ACTIVE" | "INACTIVE" | "DELETE" | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!actionOpen) return;
      const target = e.target as Node;
      if (!actionRef.current) return;
      if (!actionRef.current.contains(target)) setActionOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [actionOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAdminCategories({ page: 0, size: 100 });
        const mapped = (data.content || []).map((cat: AdminCategory) => ({
          id: cat.id,
          name: cat.name,
          priority: cat.sort ?? 0,
        }));
        setRows(mapped);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    let res = rows;

    if (q) res = res.filter((r) => r.name.toLowerCase().includes(q));

    if (filter === "priority") {
      res = [...res].sort((a, b) => a.priority - b.priority);
    }

    return res;
  }, [rows, search, filter]);

  const allChecked = useMemo(() => {
    if (!visibleRows.length) return false;
    return visibleRows.every((r) => checked[r.id]);
  }, [visibleRows, checked]);

  const toggleAll = () => {
    const next = { ...checked };
    const value = !allChecked;
    visibleRows.forEach((r) => (next[r.id] = value));
    setChecked(next);
  };

  const toggleOne = (rowId: number) => {
    setChecked((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const updateRow = (rowId: number, priority: number) => {
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, priority } : r)));
  };

  const onAddPosition = () => {
    navigate(`/admin/establishments/${id}/positions/add`);
  };

  const onAddCategory = () => {
    navigate(`/admin/establishments/${id}/categories/add`);
  };

  const onApplyTop = () => {
    setActionOpen(false);
  };

  const onApplyPopup = () => {
    setActionOpen(false);
  };

  const onCancelPopup = () => {
    setActionOpen(false);
  };

  return (
    <AdminLayout>
      <div className={styles.head}>
        <div className={styles.headBlock}>
          <div className={styles.leftBlock}>
            <h1 className={styles.title}>Categories</h1>
            <div className={styles.leftButtons}>
              <button className={styles.addPosition} onClick={onAddPosition}>
                <div className={styles.addIcon}>
                  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5343 22C18.3026 22 22.9787 17.5228 22.9787 12C22.9787 6.47715 18.3026 2 12.5343 2C6.76598 2 2.08984 6.47715 2.08984 12C2.08984 17.5228 6.76598 22 12.5343 22Z" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.5332 8V16" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.35547 12H16.711" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Add position
              </button>
              <button className={styles.addCategory} onClick={onAddCategory}>
                <div className={styles.addIcon}>
                  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5343 22C18.3026 22 22.9787 17.5228 22.9787 12C22.9787 6.47715 18.3026 2 12.5343 2C6.76598 2 2.08984 6.47715 2.08984 12C2.08984 17.5228 6.76598 22 12.5343 22Z" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.5332 8V16" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.35547 12H16.711" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Add category
              </button>
            </div>
          </div>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink} onClick={() => navigate("/admin")}>
              Home
            </span>{" "}
            / <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <span className={styles.breadcrumbLink} onClick={() => navigate("/admin/establishments")}>
              Establishments
            </span>{" "}
            /{" "}
            <span className={styles.breadcrumbLink} onClick={() => navigate(`/admin/establishments/${id}/positions`)}>
              Positions
            </span>{" "}
            / <span className={styles.active}>Categories</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <input
              className={styles.search}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterRow}>
            <select
              className={styles.select}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Filter</option>
              <option value="priority">Priority</option>
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
                    <button type="button" className={styles.actionCancel} onClick={onCancelPopup}>
                      Cancel
                    </button>
                    <button type="button" className={styles.actionApply} onClick={onApplyPopup}>
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button type="button" className={styles.applyBtn} onClick={onApplyTop}>
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
              <th>Categories</th>
              <th>Priority</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <tr key={row.id}>
                  <td className={styles.checkboxCell}>
                    <input type="checkbox" checked={!!checked[row.id]} onChange={() => toggleOne(row.id)} />
                  </td>
                  <td>{row.name}</td>
                  <td>
                    <input
                      className={styles.priorityInput}
                      value={row.priority}
                      onChange={(e) => updateRow(row.id, Number(e.target.value || 0))}
                    />
                  </td>
                  <td>
                    <button type="button" className={styles.editLink}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.empty}>
                  No categories
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
