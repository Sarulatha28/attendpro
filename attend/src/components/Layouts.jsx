import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Layouts = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Sticky) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed top-0 left-0 h-screen shadow-lg">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          EMPLOYEE
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            <li>
              <NavLink
                to="/employee-dashboard"
                className={({ isActive }) =>
                  `block px-6 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leave-requests"
                className={({ isActive }) =>
                  `block px-6 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`
                }
              >
                Apply Leave
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block px-6 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <Outlet /> {/* Nested routes render here */}
      </main>
    </div>
  );
};

export default Layouts;
