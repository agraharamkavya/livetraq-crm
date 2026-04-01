import { useNavigate } from "react-router-dom";
import {useState} from "react";

function Inventory() {
  const navigate = useNavigate();
  const [formData,setFormData]=({
    device:"",
    model:"",
    imei:"",
    date:"",
    location:""

  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleAdd=()=>{
    console.log(formData);
  alert("Inventory added ✅ (temporary)");
  };

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
        <div className="bg-white p-4 rounded shadow mb-6">

    <h3 className="text-lg font-semibold mb-4">Add Device</h3>

      <input
        name="device"
        placeholder="Device"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        name="model"
        placeholder="Device Model"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        name="imei"
        placeholder="IMEI"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="date"
        name="date"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        Add Device
      </button>

    </div>

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