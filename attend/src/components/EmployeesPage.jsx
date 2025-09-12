import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Employees</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {employees.map(emp => (
          <div
            key={emp._id}
            className="bg-white p-4 rounded shadow cursor-pointer"
            onClick={() => navigate(`/employee/${emp._id}`)}
          >
            <img src={emp.photo || "https://via.placeholder.com/100"} className="w-24 h-24 object-cover rounded-full mb-2" alt={emp.name} />
            <div className="font-semibold">{emp.name}</div>
            <div className="text-sm text-gray-500">{emp.empId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
