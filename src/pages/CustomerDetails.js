import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const customer = customers[id];

  if (!customer) {
    return <div className="p-6">Customer not found</div>;
  }
  
  const handleDelete = () => {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];

  customers.splice(id, 1); // remove selected customer

  localStorage.setItem("customers", JSON.stringify(customers));

  alert("Customer Deleted ❌");

  navigate("/customers");
};

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold">Livetraq</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">

        <div className="bg-white p-6 rounded shadow max-w-xl">
          <h2 className="text-xl font-bold mb-4">
            {customer.name}
          </h2>

          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Govt ID:</strong> {customer.govtId}</p>
          <p><strong>IMEI:</strong> {customer.imei}</p>
          <p><strong>SIM:</strong> {customer.sim}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Dealer:</strong> {customer.dealer}</p>
          <button
            onClick={() => navigate(`/edit-customer/${id}`)}
            className="mt-4 mr-3 bg-yellow-500 text-white px-4 py-2 rounded"
          >
          Edit Customer
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
         >
            Delete Customer
        </button>

        </div>

      </div>

    </div>
  );
}

export default CustomerDetails;