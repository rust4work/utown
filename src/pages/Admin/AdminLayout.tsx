import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/Logo-black.svg";
import styles from "./AdminLayout.module.scss";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [addOpen, setAddOpen] = useState(false);
  const blockRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!blockRef.current) return;
      if (!blockRef.current.contains(e.target as Node)) setAddOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAddOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);
  const toggleAdd = () => setAddOpen((v) => !v);


  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <a href="/admin" className={styles.sidebarLogo} aria-label="Go to admin home">
            <img src={Logo} alt="Utown" />
          </a>
        </div>

        <div className={styles.sidebarBody}>
          <div className={styles.sidebarSectionTitle}>
            <span className={styles.sidebarIcon}>
              <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0H0L5 5L10 0Z" fill="#495057" />
              </svg>
            </span>
            Users
          </div>

          <nav className={styles.sidebarNav}>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.navItemActive : styles.navItem)}>Clients</NavLink>
            <button type="button" className={styles.navItem}>Riders</button>
            <NavLink to="/admin/establishments" className={({ isActive }) => (isActive ? styles.navItemActive : styles.navItem)}>Establishments</NavLink>
            <button type="button" className={styles.navItem}>Orders</button>
          </nav>
        </div>

        {/* footer pinned */}
        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarBlock} ref={blockRef}>
            <div className={styles.addAnchor}>
              <button
                className={styles.sidebarButton} type="button" onMouseEnter={openAdd} onMouseLeave={closeAdd} onClick={toggleAdd}>
                <span className={styles.sidebarButtonIcon}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="20" fill="#EFEFEF" /><path d="M20 23C22.0711 23 23.75 21.3211 23.75 19.25C23.75 17.1789 22.0711 15.5 20 15.5C17.9289 15.5 16.25 17.1789 16.25 19.25C16.25 21.3211 17.9289 23 20 23Z" stroke="#414141" strokeWidth="1.5" strokeMiterlimit="10" /><path d="M13.9812 26.6943C14.5455 25.5828 15.4065 24.6493 16.4689 23.9972C17.5313 23.3452 18.7534 23 20 23C21.2465 23 22.4686 23.3452 23.531 23.9972C24.5934 24.6493 25.4544 25.5828 26.0187 26.6943" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.5 13.25H29" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M26.75 11V15.5" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M28.8875 18.5844C28.9633 19.0524 29.0009 19.5259 29 20C29 21.78 28.4722 23.5201 27.4832 25.0002C26.4943 26.4802 25.0887 27.6337 23.4442 28.3149C21.7996 28.9961 19.99 29.1744 18.2442 28.8271C16.4984 28.4798 14.8947 27.6227 13.636 26.364C12.3774 25.1053 11.5202 23.5017 11.1729 21.7558C10.8257 20.01 11.0039 18.2004 11.6851 16.5559C12.3663 14.9113 13.5198 13.5057 14.9999 12.5168C16.4799 11.5279 18.22 11 20 11C20.4741 10.9991 20.9476 11.0367 21.4156 11.1125" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                Add
              </button>

              {addOpen && (
                <div className={styles.addMenu} role="menu" aria-label="Add menu" onMouseEnter={openAdd} onMouseLeave={closeAdd}>
                  <div className={styles.addMenuHead}>Add...</div>
                  <button className={styles.addMenuItem} role="menuitem" type="button"onClick={() => {
                    setAddOpen(false);
                    navigate("/admin/clients/add");}}>
                      Client
                  </button>
                  <button className={styles.addMenuItem} type="button">Rider</button>
                  <button className={styles.addMenuItem} type="button">Establishment</button>
                  <button className={styles.addMenuItem} type="button">Service</button>
                  <button className={styles.addMenuItem} type="button">Job Vacancy</button>
                </div>
              )}
            </div>

            <button className={styles.sidebarSetting} type="button" aria-label="Settings">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.675 10.0883C24.976 10.5191 25.2394 10.975 25.4625 11.4508L28.7 13.2508C29.1043 15.0614 29.1086 16.9384 28.7125 18.7508L25.4625 20.5508C25.2394 21.0266 24.976 21.4824 24.675 21.9133L24.7375 25.6258C23.3655 26.8761 21.7416 27.818 19.975 28.3883L16.7875 26.4758C16.2632 26.5133 15.7369 26.5133 15.2125 26.4758L12.0375 28.3758C10.2654 27.8159 8.63615 26.8776 7.26254 25.6258L7.32504 21.9258C7.02662 21.489 6.7633 21.0292 6.53754 20.5508L3.30004 18.7508C2.89578 16.9402 2.89152 15.0632 3.28754 13.2508L6.53754 11.4508C6.76064 10.975 7.0241 10.5191 7.32504 10.0883L7.26254 6.37578C8.6346 5.12549 10.2585 4.18353 12.025 3.61328L15.2125 5.52578C15.7369 5.48828 16.2632 5.48828 16.7875 5.52578L19.9625 3.62578C21.7347 4.18565 23.3639 5.12397 24.7375 6.37578L24.675 10.0883Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerUser}>
            <span className={styles.headerUserIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="20" fill="#EFEFEF" /><path d="M20 23C23.3137 23 26 20.3137 26 17C26 13.6863 23.3137 11 20 11C16.6863 11 14 13.6863 14 17C14 20.3137 16.6863 23 20 23Z" stroke="#0354A6" strokeWidth="1.5" strokeMiterlimit="10" /><path d="M10.9062 28.2508C11.8278 26.6544 13.1533 25.3287 14.7496 24.407C16.3459 23.4853 18.1567 23 20 23C21.8433 23 23.6541 23.4853 25.2504 24.407C26.8467 25.3287 28.1722 26.6544 29.0938 28.2508" stroke="#0354A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span className={styles.headerUserText}>Admin</span>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;