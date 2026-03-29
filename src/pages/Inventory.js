import { useNavigate } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Livetraq</h2>

        <ul className="space-y-4">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:bg-blue-500 p-2 rounded">
            Dashboard
          </li>
          <li onClick={() => navigate("/customers")} className="cursor-pointer hover:bg-blue-500 p-2 rounded">
            Customer List
          </li>
          <li className="bg-blue-500 p-2 rounded">
            Inventory
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">

        <h2 className="text-xl font-bold mb-4">Inventory</h2>

        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Device</th>
              <th className="p-2">Device Model</th>
              <th className="p-2">IMEI</th>
              <th className="p-2">Date</th>
              <th className="p-2">Location</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center border-t">
              <td className="p-2">Tracker</td>
              <td className="p-2">LT-100</td>
              <td className="p-2">123456789</td>
              <td className="p-2">2026-03-29</td>
              <td className="p-2">Hyderabad</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Inventory;