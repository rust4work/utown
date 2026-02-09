import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import styles from "./AdminOrderHistoryPage.module.scss";
import { getAdminOrders, AdminOrder } from "../../../api/adminOrders";

type OrderRow = {
  id: number;
  client: string;
  establishment: string;
  rider: string;
  orderNumber: string;
  amount: string;
  orderTime: string;
  pickupTime: string;
  deliveryTime: string;
  items: string;
  clientPhone: string;
  establishmentPhone: string;
  riderPhone: string;
  restaurantId?: number;
};

const AdminOrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rows, setRows] = useState<OrderRow[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [checked, setChecked] = useState<Record<number, boolean>>({});
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
    const fetchOrders = async () => {
      try {
        const data = await getAdminOrders({ page: 0, size: 100 });
        const mapped = (data.content || []).map((order: AdminOrder) => {
          const amountValue =
            order.amount ?? (order as any).totalSum ?? (order as any).sumOrder ?? 0;
          const orderNumber = order.orderNumber ?? String(order.id);
          const items = order.items ?? (order as any).itemsText ?? "";

          return {
            id: order.id,
            client: order.clientName ?? (order as any).client?.name ?? "—",
            establishment:
              order.establishmentName ??
              (order as any).restaurantName ??
              (order as any).establishment?.title ??
              "—",
            rider: order.riderName ?? (order as any).rider?.name ?? "—",
            orderNumber,
            amount: amountValue ? Number(amountValue).toLocaleString() : "—",
            orderTime: order.orderTime ?? (order as any).createdAt ?? "—",
            pickupTime: order.pickupTime ?? (order as any).pickup ?? "—",
            deliveryTime: order.deliveryTime ?? (order as any).delivery ?? "—",
            items,
            clientPhone: order.clientPhone ?? (order as any).client?.phone ?? "—",
            establishmentPhone:
              order.establishmentPhone ??
              (order as any).restaurantPhone ??
              (order as any).establishment?.phone ??
              "—",
            riderPhone: order.riderPhone ?? (order as any).rider?.phone ?? "—",
            restaurantId:
              order.restaurantId ??
              (order as any).restaurantId ??
              (order as any).establishment?.id,
          };
        });

        const restaurantId = id ? Number(id) : undefined;
        const filtered = restaurantId
          ? mapped.filter((row) => row.restaurantId === restaurantId)
          : mapped;

        setRows(filtered);
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };

    fetchOrders();
  }, [id]);

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    let res = rows;

    if (q) {
      res = res.filter((r) =>
        [r.client, r.establishment, r.rider, r.orderNumber]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (filter === "amount") {
      res = [...res].sort((a, b) => Number(a.amount.replace(/,/g, "")) - Number(b.amount.replace(/,/g, "")));
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
          <h1 className={styles.title}>Order History</h1>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbLink} onClick={() => navigate("/admin")}>
              Home
            </span>{" "}
            / <span className={styles.breadcrumbLink}>Users</span> /{" "}
            <span className={styles.active}>Order History</span>
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
            <select className={styles.select} value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">Filter</option>
              <option value="amount">Amount</option>
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
              <th>Client</th>
              <th>Establishment</th>
              <th>Rider</th>
              <th>Order Number</th>
              <th>Amount</th>
              <th>Order</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Items</th>
              <th>Client's Phone</th>
              <th>Establishment's Phone</th>
              <th>Rider's Phone</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <tr key={row.id}>
                  <td className={styles.checkboxCell}>
                    <input type="checkbox" checked={!!checked[row.id]} onChange={() => toggleOne(row.id)} />
                  </td>
                  <td>{row.client}</td>
                  <td>{row.establishment}</td>
                  <td>{row.rider}</td>
                  <td>{row.orderNumber}</td>
                  <td>{row.amount}</td>
                  <td>{row.orderTime}</td>
                  <td>{row.pickupTime}</td>
                  <td>{row.deliveryTime}</td>
                  <td>{row.items}</td>
                  <td>{row.clientPhone}</td>
                  <td>{row.establishmentPhone}</td>
                  <td>{row.riderPhone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className={styles.empty}>
                  No orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderHistoryPage;
