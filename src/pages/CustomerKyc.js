import { useNavigate } from "react-router-dom";
const CustomerKyc=()=>{
    const navigate=useNavigate();


return(
    <div>
        <h2>Customer KYC</h2>
        <button onClick={() => navigate("/add-customer")}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
            >Add New Customer
        
        </button>
        <button onClick={() => navigate("/customers")}
            className="bg-green-600 text-white px-4 py-2 rounded mr-4"
            >View Customer List

        </button>
    </div>
)
}
export default CustomerKyc;