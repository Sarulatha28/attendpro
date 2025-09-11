// src/components/Navbar.jsx
import React from "react";
import { UserCheck, ClipboardList, FileText, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <UserCheck size={20} />, path: "/" },
    { id: "attendance", label: "Attendance", icon: <CalendarDays size={20} />, path: "/attendance" },
    { id: "documents", label: "Documents", icon: <FileText size={20} />, path: "/documents" },
    { id: "circulars", label: "Circulars", icon: <ClipboardList size={20} />, path: "/circulars" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col sticky top-0 h-screen shadow-lg">
      <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-700">
        Employee Panel
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              navigate(item.path);
            }}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
              active === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;
