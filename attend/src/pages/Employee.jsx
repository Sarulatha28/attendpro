export default function Employee({ employee, onClick }) {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
      onClick={onClick}
    >
      <img
        src={`http://localhost:5000/uploads/${employee.profilePhoto}`}
        alt={employee.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-white font-medium">{employee.name}</div>
    </div>
  );
}
