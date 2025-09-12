import React from "react";

export default function EmployeeDetails({ employee, onBack }) {
  if (!employee) return null;

  return (
    <div className="bg-white p-6 rounded shadow">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-2 bg-gray-600 text-white rounded"
      >
        Back
      </button>
      <div className="flex items-center gap-6">
        <img
          src={employee.photo || "https://via.placeholder.com/150"}
          alt={employee.name}
          className="w-32 h-32 object-cover rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">Employee ID: {employee.employeeId}</p>
          <p className="text-gray-600">Email: {employee.email}</p>
          <p className="text-gray-600">Phone: {employee.phone}</p>
        </div>
      </div>
    </div>
  );
}
