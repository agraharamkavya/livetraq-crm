import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddCustomer() {
     const navigate = useNavigate();
    const [formData, setFormData] = useState({
  name: "",
  govtId: "",
  imei: "",
  sim: "",
  email: "",
  phone: "",
  address: "",
  dealer: ""
});
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };
const handleSubmit = async () => {
  try {
    await axios.post(
      "https://livetraq-backend.onrender.com/api/customers/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Customer Saved ✅");
    navigate("/customers");

  } catch (err) {
    console.error(err);

    if (err.response && err.response.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/");
    }
  }
};
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Livetraq</h2>

        <ul className="space-y-4">
          <li className="hover:bg-blue-500 p-2 rounded">Dashboard</li>
          <li className="bg-blue-500 p-2 rounded">Customer KYC</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="bg-white p-6 rounded shadow max-w-xl">
          <h2 className="text-xl font-bold mb-4">
            Customer KYC Form
          </h2>

          <input name="name"
                 value={formData.name}
                 onChange={handleChange}
                 placeholder="Full Name"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="govtId"
                 value={formData.govtId}
                 onChange={handleChange}
                 placeholder="Govt ID"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="imei"
                 value={formData.imei}
                 onChange={handleChange}
                 placeholder="IMEI"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="sim"
                 value={formData.sim}
                 onChange={handleChange}
                 placeholder="SIM"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="email"
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="Email"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="phone"
                 value={formData.phone}
                 onChange={handleChange}
                 placeholder="Phone"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="address"
                 value={formData.address}
                 onChange={handleChange}
                 placeholder="Address"
                 className="w-full mb-3 p-2 border rounded"
          />
          <input name="dealer"
                 value={formData.dealer}
                 onChange={handleChange}
                 placeholder="Dealer"
                 className="w-full mb-3 p-2 border rounded"
          />
          
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-3"
           >
            Save
            </button>

          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddCustomer;