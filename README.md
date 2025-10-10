# 🕸️ NetNest

**NetNest** is a real-time E-Commerce web app that connects **customers** with **local Internet Service Providers (ISPs)**.
It provides a seamless experience for users to explore vendors, purchase internet plans, and manage their subscriptions — while giving vendors a powerful dashboard to manage services, billing, and customers efficiently.

---

## 🚀 Key Features

- **Role-Based Dashboards** — Separate panels for customers, vendors, and admin users.
- **Real-Time Updates** — Built with **Pusher.js WebSockets** for live synchronization between customers and vendors.
- **E-Commerce Functionality** — Customers can buy internet plans and manage active subscriptions.
- **Vendor Management System** — Vendors can handle billing, revenue tracking, and customer details.
- **Interactive Location System** — Vendors and customers can share and view live locations.
- **Responsive Design** — Modern UI with seamless mobile and desktop support.

---

## 🧠 Tech Stack

- **Backend:** Laravel 12
- **Frontend:** Inertia.js (React + TypeScript)
- **Real-Time Engine:** Pusher.js WebSockets
- **Database:** MySQL
- **Auth:** Laravel Breeze
- **Styling:** Tailwind CSS + Shadcn UI

---

## 🧩 Team

- **Himesh** — Full-stack Development & Real-Time Integration
- **Hashir** — Backend Development & Database Architecture

---

## 🏁 Getting Started

```bash
# Clone the repository
git clone https://github.com/HimeshDua/NetNest.git

# Install dependencies
npm install
composer install

# Required Server
# Use WAMP before migration

# Migrate Data And Generate Fake Data
php artisan migrate
php artisan db:seed

# Start the development server
composer dev
```

## 📜 License

This project is open-source and available under the MIT License.
