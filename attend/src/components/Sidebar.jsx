// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEmployeeModal from "./modals/AddEmployeeModal";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <aside className="w-64 bg-[#0f0b0b] text-white min-h-screen p-6 relative">
      <div className="text-2xl font-bold mb-6 flex justify-between items-center">
        Attendo
        <button onClick={() => setOpenModal(true)}>
          <Plus className="w-6 h-6 text-green-400 hover:text-green-600" />
        </button>
      </div>

      <nav className="space-y-3 text-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left bg-[#221616] p-3 rounded hover:bg-[#332020]"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/employee")}
          className="w-full text-left p-3 rounded hover:bg-[#221616] flex justify-between"
        >
          Employee
        </button>
        <button
          onClick={() => navigate("/log")}
          className="w-full text-left p-3 rounded hover:bg-[#221616]"
        >
          Log
        </button>
      </nav>

      {openModal && <AddEmployeeModal onClose={() => setOpenModal(false)} />}
    </aside>
  );
}
