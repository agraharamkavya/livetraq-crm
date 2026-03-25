import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  // 🔥 Fetch customer from backend
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(
          "https://livetraq-backend.onrender.com/api/customers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        // ✅ safer match
        const customer = res.data.find(
          (c) => c._id.toString() === id.toString()
        );

        if (customer) {
          setFormData(customer);
        } else {
          alert("Customer not found ❌");
          navigate("/customers");
        }

      } catch (err) {
        console.error(err);
        alert("Error loading customer ❌");
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Update via API
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://livetraq-backend.onrender.com/api/customers/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Customer Updated ✏️");
      navigate("/customers");

    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  // ✅ Loading state (VERY IMPORTANT)
  if (!formData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

      <input
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        name="imei"
        value={formData.imei || ""}
        onChange={handleChange}
        placeholder="IMEI"
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>

    </div>
  );
}

export default EditCustomer;