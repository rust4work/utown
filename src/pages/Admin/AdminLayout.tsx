import React from "react";
import Logo from "../../assets/images/Logo-black.svg";
import styles from "./AdminLayout.module.scss";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      {/* Левое меню */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <a href="/admin" className={styles.sidebarLogo}>
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className={styles.sidebarBody}>
          <div className={styles.sidebarSectionTitle}>Users</div>
          <nav className={styles.sidebarNav}>
            <button className={`${styles.navItem} ${styles.navItemActive}`}>
              Clients
            </button>
            <button className={styles.navItem}>Riders</button>
            <button className={styles.navItem}>Establishments</button>
            <button className={styles.navItem}>Orders</button>
          </nav>
        </div>
      </aside>

      {/* Правая часть: хедер + контент */}
      <div className={styles.main}>
        <header className={styles.header}>
        <div className={styles.headerRight}>
            <div className={styles.headerUser}>
              <div className={styles.headerUserIcon}><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="20" fill="#EFEFEF"/><path d="M20 23C23.3137 23 26 20.3137 26 17C26 13.6863 23.3137 11 20 11C16.6863 11 14 13.6863 14 17C14 20.3137 16.6863 23 20 23Z" stroke="#0354A6" stroke-width="1.5" stroke-miterlimit="10"/><path d="M10.9062 28.2508C11.8278 26.6544 13.1533 25.3287 14.7496 24.407C16.3459 23.4853 18.1567 23 20 23C21.8433 23 23.6541 23.4853 25.2504 24.407C26.8467 25.3287 28.1722 26.6544 29.0938 28.2508" stroke="#0354A6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <div className={styles.headerUserText}>Admin</div>
            </div>
        </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;