import React from "react";

export default function EmployeeCard({ employee, onClick }) {
  return (
    <div
      className="bg-white p-3 rounded shadow flex flex-col items-center cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={employee.photo || "https://via.placeholder.com/100"}
        alt={employee.name}
        className="w-24 h-24 object-cover rounded-full mb-2"
      />
      <h3 className="font-semibold">{employee.name}</h3>
      <p className="text-sm text-gray-500">ID: {employee.employeeId}</p>
    </div>
  );
}
