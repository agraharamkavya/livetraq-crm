import { useNavigate } from "react-router-dom";

const CustomerKyc = () => {
  const navigate = useNavigate();

  return (
    // 🔹 PAGE BACKGROUND + PADDING
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔹 CARD CONTAINER (THIS IS WHAT YOU WERE MISSING) */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">

        <h2 className="text-xl font-semibold mb-4">Customer KYC</h2>

        {/* 🔹 BUTTON GROUP */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add-customer")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Customer
          </button>

          <button
            onClick={() => navigate("/customers")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View Customer List
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerKyc;