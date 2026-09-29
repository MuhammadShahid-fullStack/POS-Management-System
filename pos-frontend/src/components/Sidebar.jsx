import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ReceiptText,
  Tags,
  Users,
  LogOut,
  X,
} from "lucide-react";

import { hasPermission } from "../utils/permissions";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) => `
    group
    flex items-center gap-3
    w-full
    px-3.5 py-3
    rounded-xl
    text-sm font-medium
    transition-all duration-300

    ${
      isActive(path)
        ? `
          bg-gradient-to-r
          from-violet-500
          to-fuchsia-500
          text-white
          shadow-[0_8px_25px_rgba(139,92,246,0.22)]
        `
        : `
          text-slate-500
          hover:bg-violet-50
          hover:text-violet-700
          hover:translate-x-0.5
        `
    }
  `;

  const iconClass = (path) => `
    w-[18px] h-[18px]
    shrink-0
    transition-all duration-300

    ${
      isActive(path)
        ? "text-white"
        : `
          text-slate-400
          group-hover:text-violet-600
          group-hover:scale-105
        `
    }
  `;

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="
            fixed inset-0
            z-40
            bg-slate-900/20
            backdrop-blur-sm
            md:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          top-0 left-0
          z-50
          w-64
          min-h-screen
          overflow-hidden
          border-r border-slate-200/70
          bg-white/80
          shadow-[10px_0_50px_rgba(15,23,42,0.07)]
          backdrop-blur-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* =====================================================
            BACKGROUND GLOW
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-violet-200/40
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-20
            -right-24
            h-72
            w-72
            rounded-full
            bg-fuchsia-200/30
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-10
            top-1/2
            h-40
            w-40
            rounded-full
            bg-blue-100/30
            blur-[80px]
          "
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="relative z-10">

          {/* =================================================
              LOGO
          ================================================== */}

          <div
            className="
              flex
              h-16
              items-center
              justify-between
              border-b
              border-slate-200/70
              px-5
            "
          >
            <div className="flex items-center gap-3">

              {/* Logo */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-linear-to-br
                  from-violet-500
                  to-fuchsia-500
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_25px_rgba(139,92,246,0.22)]
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-[0_10px_30px_rgba(217,70,239,0.28)]
                "
              >
                P
              </div>

              {/* Brand */}

              <div>
                <h1 className="text-sm font-bold text-slate-900">
                  POS System
                </h1>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Management
                </p>
              </div>

            </div>

            {/* =================================================
                MOBILE CLOSE
            ================================================== */}

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white/70
                text-slate-400
                transition-all
                duration-200
                hover:bg-violet-50
                hover:text-violet-600
                md:hidden
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <nav className="p-4">

            {/* Main Menu */}

            <p
              className="
                mb-3
                px-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-slate-400
              "
            >
              Main Menu
            </p>

            <ul className="space-y-1.5">

              {/* =================================================
                  DASHBOARD
              ================================================== */}

              {hasPermission("dashboard") && (
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className={linkClass("/")}
                  >
                    <LayoutDashboard
                      className={iconClass("/")}
                    />

                    <span>Dashboard</span>

                    {isActive("/") && (
                      <span
                        className="
                          ml-auto
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-white
                          shadow-[0_0_10px_rgba(255,255,255,0.8)]
                        "
                      />
                    )}
                  </Link>
                </li>
              )}

              {/* =================================================
                  PRODUCTS
              ================================================== */}

              {hasPermission("products") && (
                <li>
                  <Link
                    to="/products"
                    onClick={() => setIsSidebarOpen(false)}
                    className={linkClass("/products")}
                  >
                    <Package
                      className={iconClass("/products")}
                    />

                    <span>Products</span>

                    {isActive("/products") && (
                      <span
                        className="
                          ml-auto
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-white
                          shadow-[0_0_10px_rgba(255,255,255,0.8)]
                        "
                      />
                    )}
                  </Link>
                </li>
              )}

              {/* =================================================
                  POS
              ================================================== */}

              {hasPermission("pos") && (
                <li>
                  <Link
                    to="/pos"
                    onClick={() => setIsSidebarOpen(false)}
                    className={linkClass("/pos")}
                  >
                    <ShoppingCart
                      className={iconClass("/pos")}
                    />

                    <span>POS</span>

                    {isActive("/pos") && (
                      <span
                        className="
                          ml-auto
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-white
                          shadow-[0_0_10px_rgba(255,255,255,0.8)]
                        "
                      />
                    )}
                  </Link>
                </li>
              )}

              {/* =================================================
                  SALES
              ================================================== */}

              {hasPermission("sales") && (
                <li>
                  <Link
                    to="/sales"
                    onClick={() => setIsSidebarOpen(false)}
                    className={linkClass("/sales")}
                  >
                    <ReceiptText
                      className={iconClass("/sales")}
                    />

                    <span>Sales</span>

                    {isActive("/sales") && (
                      <span
                        className="
                          ml-auto
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-white
                          shadow-[0_0_10px_rgba(255,255,255,0.8)]
                        "
                      />
                    )}
                  </Link>
                </li>
              )}

              {/* =================================================
                  SETTINGS
              ================================================== */}

              {(hasPermission("categories") ||
                hasPermission("users")) && (
                <li
                  className="
                    mt-6
                    border-t
                    border-slate-200/70
                    pt-5
                  "
                >
                  <p
                    className="
                      mb-3
                      px-3
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-slate-400
                    "
                  >
                    Settings
                  </p>

                  <div className="space-y-1.5">

                    {/* Categories */}

                    {hasPermission("categories") && (
                      <Link
                        to="/settings/categories"
                        onClick={() =>
                          setIsSidebarOpen(false)
                        }
                        className={linkClass(
                          "/settings/categories"
                        )}
                      >
                        <Tags
                          className={iconClass(
                            "/settings/categories"
                          )}
                        />

                        <span>Categories</span>

                        {isActive(
                          "/settings/categories"
                        ) && (
                          <span
                            className="
                              ml-auto
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-white
                              shadow-[0_0_10px_rgba(255,255,255,0.8)]
                            "
                          />
                        )}
                      </Link>
                    )}

                    {/* Users */}

                    {hasPermission("users") && (
                      <Link
                        to="/settings/users"
                        onClick={() =>
                          setIsSidebarOpen(false)
                        }
                        className={linkClass(
                          "/settings/users"
                        )}
                      >
                        <Users
                          className={iconClass(
                            "/settings/users"
                          )}
                        />

                        <span>Users</span>

                        {isActive("/settings/users") && (
                          <span
                            className="
                              ml-auto
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-white
                              shadow-[0_0_10px_rgba(255,255,255,0.8)]
                            "
                          />
                        )}
                      </Link>
                    )}

                  </div>
                </li>
              )}

              {/* =================================================
                  LOGOUT
              ================================================== */}

              <li
                className="
                  mt-6
                  border-t
                  border-slate-200/70
                  pt-5
                "
              >
                <button
                  onClick={handleLogout}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3.5
                    py-3
                    text-sm
                    font-medium
                    text-slate-400
                    transition-all
                    duration-300
                    hover:bg-rose-50
                    hover:text-rose-600
                  "
                >
                  <LogOut
                    size={18}
                    className="
                      text-slate-400
                      transition-all
                      duration-300
                      group-hover:scale-105
                      group-hover:text-rose-500
                    "
                  />

                  <span>Logout</span>
                </button>
              </li>

            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;