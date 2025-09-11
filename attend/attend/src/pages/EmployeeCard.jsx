export default function EmployeeCard({ employee, onClick }) {
  return (
    <div
      onClick={onClick}
      className="min-w-[220px] cursor-pointer p-3 rounded shadow hover:shadow-md flex items-center gap-3 bg-white"
    >
      <img src={employee.photoUrl || "/default-avatar.png"} alt={employee.name} className="w-16 h-16 rounded object-cover" />
      <div>
        <div className="font-medium">{employee.name}</div>
        <div className="text-xs text-gray-500">{employee.employeeId}</div>
      </div>
    </div>
  );
}
