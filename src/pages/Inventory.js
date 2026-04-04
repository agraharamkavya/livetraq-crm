import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Inventory() {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);

  const [formData, setFormData] = useState({
    device: "",
    model: "",
    imei: "",
    date: "",
    location: ""
  });

  // 🔥 Fetch inventory from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          "https://livetraq-backend.onrender.com/api/inventory",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setInventory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInventory();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Save to backend
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "https://livetraq-backend.onrender.com/api/inventory",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setInventory([...inventory, res.data]);

      alert("Inventory added ✅");

      setFormData({
        device: "",
        model: "",
        imei: "",
        date: "",
        location: ""
      });

    } catch (err) {
      console.error(err);
      alert("Error adding inventory ❌");
    }
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

        {/* Form */}
        <div className="bg-white p-4 rounded shadow mb-6">

          <h3 className="text-lg font-semibold mb-4">Add Device</h3>

          <input
            name="device"
            value={formData.device}
            placeholder="Device"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            name="model"
            value={formData.model}
            placeholder="Device Model"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            name="imei"
            value={formData.imei}
            placeholder="IMEI"
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            name="location"
            value={formData.location}
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

        {/* Table */}
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
            {inventory.map((item) => (
              <tr key={item._id} className="text-center border-t">
                <td className="p-2">{item.device}</td>
                <td className="p-2">{item.model}</td>
                <td className="p-2">{item.imei}</td>
                <td className="p-2">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="p-2">{item.location}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;