import React, { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Activity, MapPin, Plus } from "lucide-react";
import Sidebar from "./Sidebar";
import AddEmployeeModal from "./AddEmployeeModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const handleSetLocation = () => {
    navigate("/company-form"); // navigate to your route
  };
  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  // Counts
  const totalEmployees = employees.length;
  const presentCount = employees.filter((emp) => emp.status === "present").length;
  const absentCount = employees.filter((emp) => emp.status === "absent").length;
  const liveCount = presentCount; // you can define differently if needed

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 relative">
        {/* Top Right Buttons */}
        <div className="absolute top-6 right-6 flex gap-4">
            <button
      onClick={handleSetLocation}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
    >
      <MapPin className="w-5 h-5" />
      Set Location
    </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {/* Total Employees */}
          <div
            onClick={() => navigate("/employees")}
            className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 cursor-pointer hover:shadow-lg"
          >
            <Users className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-gray-500">Total Employees</p>
              <h2 className="text-2xl font-bold">{totalEmployees}</h2>
            </div>
          </div>

          {/* Present */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4">
            <UserCheck className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-gray-500">Present</p>
              <h2 className="text-2xl font-bold">{presentCount}</h2>
            </div>
          </div>

          {/* Absent */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4">
            <UserX className="w-10 h-10 text-red-600" />
            <div>
              <p className="text-gray-500">Absent</p>
              <h2 className="text-2xl font-bold">{absentCount}</h2>
            </div>
          </div>

          {/* Live Count */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4">
            <Activity className="w-10 h-10 text-purple-600" />
            <div>
              <p className="text-gray-500">Live Count</p>
              <h2 className="text-2xl font-bold">{liveCount}</h2>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} />}
      </main>
    </div>
  );
}
