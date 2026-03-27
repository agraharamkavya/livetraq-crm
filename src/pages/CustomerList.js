import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          "https://livetraq-backend.onrender.com/api/customers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setCustomers(res.data);

      } catch (err) {
        console.error(err);

        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fetchCustomers();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://livetraq-backend.onrender.com/api/customers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Customer deleted ❌");

      setCustomers(customers.filter(c => c._id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Livetraq</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">

        <h2 className="text-xl font-bold mb-4">Customer List</h2>

        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">IMEI</th>
              <th className="p-2">SIM</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Dealer</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((cust) => (
              <tr
                key={cust._id}
                onClick={() => navigate(`/customer/${cust._id}`)} // ✅ FIXED
                className="text-center border-t cursor-pointer hover:bg-gray-100"
              >
                <td className="p-2">{cust.name}</td>
                <td className="p-2">{cust.imei}</td>
                <td className="p-2">{cust.sim}</td>
                <td className="p-2">{cust.phone}</td>
                <td className="p-2">{cust.dealer}</td>

                <td className="p-2">
          {role === "admin" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit-customer/${cust._id}`);
                }}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(cust._id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </>
          )}
        </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerList;