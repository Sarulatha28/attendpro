import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Employees</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Company ID</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.employeeId}</td>
              <td className="border p-2">{emp.companyId}</td>
              <td className="border p-2">{emp.phone}</td>
              <td className="border p-2">{emp.status || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
