import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDetails from "../components/EmployeeDetails";
import Sidebar from "../components/Sidebar";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {!selectedEmployee && (
          <section>
            <h2 className="text-lg font-semibold mb-4">All Employees</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {employees.map((emp) => (
                <EmployeeCard
                  key={emp._id}
                  employee={emp}
                  onClick={() => setSelectedEmployee(emp)}
                />
              ))}
            </div>
          </section>
        )}

        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            onBack={() => setSelectedEmployee(null)}
          />
        )}
      </div>
    </div>
  );
}
