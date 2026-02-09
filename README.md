# UTown: Modern Food Delivery & Service Marketplace

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Ant Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

> **A scalable, role-based frontend architecture for a multi-tenant delivery platform.**  
> Built with performance, strict typing, and separation of concerns in mind.

---

## 🚀 Project Overview

UTown is a comprehensive frontend application designed to handle complex user flows for three distinct roles:

- **Clients** (Customers)
- **Restaurateurs** (Vendors)
- **Admins**

Unlike simple CRUD apps, this project demonstrates **enterprise-level architectural patterns**, including:

- **Role-Based Access Control (RBAC):** Secure routing that restricts access based on user roles.
- **JWT Authentication:** Secure implementation with Axios interceptors for automatic token handling.
- **Complex State Management:** Using Context API and React Hooks for global user state.
- **Dynamic Nested Routing:** A scalable routing system handling deep links and layout wrappers.

---

## 🛠️ Tech Stack & Key Libraries

- **Core:** React 18+, TypeScript  
- **Build Tool:** Vite (for lightning-fast HMR and build times)  
- **Routing:** React Router v6.4+ (Data API, `createBrowserRouter`)  
- **State & API:** Axios (custom instances + interceptors), React Context API  
- **Forms:** React Hook Form (performance-first validation)  
- **UI/UX:** SCSS Modules (scoped styling), Ant Design (component library), Swiper (touch sliders)

---

## 🏗️ Architecture & Engineering Decisions

This project wasn't just "built to work" — it was **built to scale**.  
Below are the key engineering decisions:

### 1️⃣ Centralized API Layer (`/src/api`)

Instead of scattering `fetch` calls, the app uses a configured **Axios instance**.

**Why?**
- Automatically injects Authorization headers (Bearer tokens) via interceptors.
- Centralizes error handling logic.

**Benefit:**
- If the backend URL changes or auth logic updates, it's fixed in *one place*, not every component.

---

### 2️⃣ Protected Route Wrappers (`/src/routes`)

Security is handled at the routing level using Higher-Order Components (HOCs) like:

- `<ProtectedRoute />`
- `<AdminProtectedRoute />`

**Why?**
- Ensures untrusted shallow rendering never exposes sensitive dashboards.

**Benefit:**
- Decouples security logic from UI logic.
- Keeps page components clean and focused.

---

### 3️⃣ Modular Folder Structure

```
src/
├── api/             # API definitions (Auth, Restaurants, Orders)
├── components/      # Reusable UI (Buttons, Modals, Inputs)
├── hooks/           # Custom hooks (useNavigateTo, etc.)
├── layouts/         # Layout wrappers for consistent UI
├── pages/           # Page-level components (lazy-loadable)
├── routes/          # Centralized route configuration
├── utils/           # Helper functions & Context Providers
└── styles/          # Global variables & SCSS mixins
```

This structure ensures that as the application grows to hundreds of components, it remains navigable and maintainable.

---

## 🌟 Key Features

### 🔐 Authentication System

- Login / Register with JWT
- Password recovery flow
- Auto-logout on token expiration (handled via Axios interceptors)

---

### 🛒 E-Commerce Flows

- Restaurant listings with filtering
- Interactive Cart & Checkout mechanism
- Order history & tracking system

---

### 👑 Admin Dashboard

- Manage Users, Restaurants, and Orders
- Data tables with sorting and filtering
- Role-based visibility & protected routes

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/utown-frontend.git
cd utown-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

---

## 🔮 Roadmap & Future Improvements

To demonstrate awareness of scalability and technical debt, the following improvements are planned:

- **Testing:** Implementation of Unit Tests (Jest/Vitest) and E2E Tests (Cypress/Playwright).
- **Strict Typing:** Refactoring legacy `any` types to strict interfaces for 100% type safety.
- **Data Fetching Optimization:** Migration from `useEffect`-based fetching to SWR or React Query for caching and improved UX.
- **Performance Enhancements:** Code splitting refinements and further lazy loading optimization.

---

## 👨‍💻 Author

Built with ❤️ by **Rustam**  
Open to Frontend Engineer opportunities.
