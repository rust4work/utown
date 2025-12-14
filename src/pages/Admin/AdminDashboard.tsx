import React, { useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import styles from "./AdminDashboard.module.scss";
import Eye from "../../assets/images/icons/admineye.svg";

type ClientRow = {
  id: number;
  name: string;
  phone: string;
  city: string;
  address: string;
  ordersCount: number;
};

const MOCK_CLIENTS: ClientRow[] = [
  {
    id: 1,
    name: "Client 1",
    phone: "010 1234 56 78",
    city: "Seoul",
    address: "12 Mugeo-ro, Jung-gu, Seoul, Jeong-o Building",
    ordersCount: 14,
  },
  {
    id: 2,
    name: "Client 2",
    phone: "010 1234 56 78",
    city: "Seoul",
    address: "12 Mugeo-ro, Jung-gu, Seoul, Jeong-o Building",
    ordersCount: 14,
  },
  {
    id: 3,
    name: "Client 3",
    phone: "010 1234 56 78",
    city: "Seoul",
    address: "12 Mugeo-ro, Jung-gu, Seoul, Jeong-o Building",
    ordersCount: 14,
  },
  {
    id: 4,
    name: "Client 4",
    phone: "010 1234 56 78",
    city: "Seoul",
    address: "12 Mugeo-ro, Jung-gu, Seoul, Jeong-o Building",
    ordersCount: 14,
  },
  {
    id: 5,
    name: "Client 5",
    phone: "010 1234 56 78",
    city: "Seoul",
    address: "12 Mugeo-ro, Jung-gu, Seoul, Jeong-o Building",
    ordersCount: 14,
  },
  {
    id: 6,
    name: "Client 6",
    phone: "010 1234 56 78",
    city: "Seoul",
    address: "12 Mugeo-ro, Jung-gu, Seoul, Jeong-o Building",
    ordersCount: 14,
  },
  {
    id: 7,
    name: "Client 7",
    phone: "010 2222 33 44",
    city: "Seoul",
    address: "15 Some-ro, Jung-gu, Seoul, Building A",
    ordersCount: 8,
  },
  {
    id: 8,
    name: "Client 8",
    phone: "010 2222 33 55",
    city: "Seoul",
    address: "18 Some-ro, Jung-gu, Seoul, Building B",
    ordersCount: 3,
  },
  {
    id: 9,
    name: "Client 9",
    phone: "010 2222 33 66",
    city: "Seoul",
    address: "21 Some-ro, Jung-gu, Seoul, Building C",
    ordersCount: 19,
  },
  {
    id: 10,
    name: "Client 10",
    phone: "010 2222 33 77",
    city: "Seoul",
    address: "25 Some-ro, Jung-gu, Seoul, Building D",
    ordersCount: 1,
  },
  {
    id: 11,
    name: "Client 11",
    phone: "010 2222 33 88",
    city: "Seoul",
    address: "30 Some-ro, Jung-gu, Seoul, Building E",
    ordersCount: 6,
  },
  {
    id: 12,
    name: "Client 12",
    phone: "010 2222 33 99",
    city: "Seoul",
    address: "33 Some-ro, Jung-gu, Seoul, Building F",
    ordersCount: 11,
  },
];

const PAGE_SIZE = 6;

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MOCK_CLIENTS.length / PAGE_SIZE) || 1;

  const clientsOnPage = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return MOCK_CLIENTS.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePage = (page: number) => setCurrentPage(page);

  return (
    <AdminLayout>
      <div className={styles.page}>
        {/* Верхняя панель */}
        <section className={styles.topBar}>
          <div className={styles.titleBlock}>
            <h1 className={styles.pageTitle}>Clients</h1>
            <div className={styles.breadcrumbs}>
              <span>Home</span> / <span>Users</span> /{" "}
              <span className={styles.breadcrumbActive}>Clients</span>
            </div>
          </div>

          <div className={styles.controlsBlock}>
            <input
              className={styles.searchInput}
              placeholder="Search"
              type="text"
            />

            <div className={styles.actionsRow}>
              <select className={styles.select}>
                <option>Filter</option>
              </select>

              <select className={styles.select}>
                <option>Choose action</option>
              </select>

              <button className={styles.applyButton}>Apply</button>
            </div>
          </div>
        </section>

        {/* Таблица-карточка */}
        <section className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCol}>
                  <input type="checkbox" />
                </th>

                <th>
                  <span className={styles.thWithSort}>
                    Name <span className={styles.sortIcon}>▾</span>
                  </span>
                </th>

                <th>
                  <span className={styles.thWithSort}>
                    Number <span className={styles.sortIcon}>▾</span>
                  </span>
                </th>

                <th>
                  <span className={styles.thWithSort}>
                    City <span className={styles.sortIcon}>▾</span>
                  </span>
                </th>

                <th>
                  <span className={styles.thWithSort}>
                    Address <span className={styles.sortIcon}>▾</span>
                  </span>
                </th>

                <th>
                  <span className={styles.thWithSort}>
                    Orders <span className={styles.sortIcon}>▾</span>
                  </span>
                </th>

                <th>
                  <span className={styles.thWithSort}>
                    Order History <span className={styles.sortIcon}>▾</span>
                  </span>
                </th>

                <th className={styles.eyeCol}></th>
              </tr>
            </thead>

            <tbody>
              {clientsOnPage.map((client) => (
                <tr key={client.id}>
                  <td className={styles.checkboxCol}>
                    <input type="checkbox" />
                  </td>

                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.city}</td>
                  <td className={styles.addressCell}>{client.address}</td>
                  <td>{client.ordersCount}</td>

                  <td>
                    <button className={styles.viewLink}>
                      View <span className={styles.viewArrow}>›</span>
                    </button>
                  </td>

                  <td className={styles.eyeCol}>
                    <button className={styles.eyeButton} title="View client">
                      <img src={Eye} alt="eye" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Пагинация внизу страницы */}
        <div className={styles.paginationBottom}>
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
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
                >
                  {page}
                </button>
              );
            })}

            <button
              className={styles.paginationButton}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;