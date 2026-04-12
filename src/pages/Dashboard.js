import { useNavigate } from "react-router-dom";
function Dashboard() {
      const navigate = useNavigate();
      const handleLogout = () => {
            localStorage.removeItem("token");
            window.location.href = "/";
            };
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Livetraq</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:bg-blue-500 p-2 rounded">
            Dashboard
          </li>
          
          <li onClick={() => navigate("/customer-kyc")} className="cursor-pointer hover:bg-blue-500 p-2 rounded">
            Customer KYC
          </li>
          
          {localStorage.getItem("role") === "admin" && (
              <li onClick={() => navigate("/inventory")} className="cursor-pointer hover:bg-blue-500 p-2 rounded">
                Inventory
              </li>
             
            )}
              {localStorage.getItem("role") === "admin" && (
              <li onClick={() => navigate("/inventory")} className="cursor-pointer hover:bg-blue-500 p-2 rounded">
                Payments
              </li>
             
            )}
             
            
          <li className="cursor-pointer hover:bg-blue-500 p-2 rounded">
            Reports
          </li>
          <li className="cursor-pointer hover:bg-blue-500 p-2 rounded">
            Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <span>Kavya</span>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Welcome to Livetraq CRM
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;