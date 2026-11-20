import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Users,
  UserCircle,
  LogOut,
  Menu,
  X,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function DashboardLayout() {
  const { user, logout } = useAuth(),
    [open, setOpen] = useState(false),
    nav = useNavigate();
  const links = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    {
      to: "/complaints",
      label:
        user.role === "ADMIN"
          ? "All complaints"
          : user.role === "STAFF"
            ? "Assigned complaints"
            : "My complaints",
      icon: ClipboardList,
    },
    ...(user.role === "STUDENT"
      ? [{ to: "/complaints/new", label: "Report an issue", icon: PlusCircle }]
      : []),
    ...(user.role === "ADMIN"
      ? [{ to: "/users", label: "Team & users", icon: Users }]
      : []),
    { to: "/profile", label: "My profile", icon: UserCircle },
  ];
  return (
    <div className="app-shell">
      <aside className={"sidebar " + (open ? "sidebar-open" : "")}>
        <div className="brand">
          <Activity /> Campus<span>Pulse</span>
          <button
            className="mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>
        <div className="side-caption">WORKSPACE · {user.role}</div>
        <nav aria-label="Dashboard navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              onClick={() => setOpen(false)}
              to={to}
              className={({ isActive }) =>
                "side-link " + (isActive ? "active" : "")
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <ShieldCheck size={18} /> Secure campus workspace
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
          <div className="topbar-title">
            CampusPulse{" "}
            <span className="muted">/ {user.role.toLowerCase()} portal</span>
          </div>
          <div className="top-actions">
            <span className="avatar">{user.name?.[0]?.toUpperCase()}</span>
            <span className="top-name">{user.name}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                logout();
                nav("/");
              }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
