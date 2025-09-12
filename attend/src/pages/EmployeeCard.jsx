import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeCard() {
  const [employees, setEmployees] = useState([]); // ✅ initialize as array
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/employees");
        
        // ✅ Ensure res.data is an array
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        } else {
          console.warn("Employees response is not an array:", res.data);
          setEmployees([]); // fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setEmployees([]); // fallback to empty array
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div className="p-4">
      {/* Horizontal scroll cards */}
      <div className="flex overflow-x-auto gap-4 pb-2">
        {employees.length > 0 ? (
          employees.map(emp => (
            <div key={emp._id} onClick={() => setSelectedEmployee(emp)}
              className="min-w-[220px] cursor-pointer p-3 rounded shadow hover:shadow-lg flex flex-col items-center gap-2 bg-white">
              <img
                src={emp.photoUrl ? `${import.meta.env.VITE_API_URL.replace("/api","")}${emp.photoUrl}` : "/default-avatar.png"}
                alt={emp.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="font-medium text-center">{emp.name}</div>
              <div className="text-xs text-gray-500">{emp.employeeId}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No employees found.</div>
        )}
      </div>

      {/* Selected employee details */}
      {selectedEmployee && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-xl font-bold mb-3">{selectedEmployee.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            <p><strong>ID:</strong> {selectedEmployee.employeeId}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
            <p><strong>Age:</strong> {selectedEmployee.age}</p>
            <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
            <p><strong>Education:</strong> {selectedEmployee.education}</p>
            <p><strong>Experience:</strong> {selectedEmployee.experience}</p>
            <p><strong>Description:</strong> {selectedEmployee.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
