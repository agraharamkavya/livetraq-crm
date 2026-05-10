import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activeSegment, setActiveSegment] = useState(null);
  const [searchOption, setSearchOption] = useState("IMEI");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, inventoryRes] = await Promise.all([
          axios.get("https://livetraq-backend.onrender.com/api/customers", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }),
          axios.get("https://livetraq-backend.onrender.com/api/inventory", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
        ]);

        setCustomers(customerRes.data || []);
        setInventory(inventoryRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeDevices = useMemo(() => {
    const assignedImeis = new Set(customers.map((cust) => cust.imei));
    return inventory.filter((item) => assignedImeis.has(item.imei)).length;
  }, [customers, inventory]);

  const availableDevices = useMemo(
    () => Math.max(0, inventory.length - activeDevices),
    [inventory.length, activeDevices]
  );

  const paymentsCount = useMemo(
    () => (customers.length > 0 ? Math.max(1, Math.ceil(customers.length / 2)) : 0),
    [customers.length]
  );

  const stats = useMemo(
    () => [
      {
        key: "customers",
        label: "Total Customers",
        value: customers.length,
        buttonClass: "from-blue-500 to-cyan-400",
        segmentColor: "#3B82F6",
        route: "/customer-kyc"
      },
      {
        key: "devices",
        label: "Total Devices",
        value: inventory.length,
        buttonClass: "from-green-500 to-emerald-400",
        segmentColor: "#10B981",
        route: "/inventory"
      },
      {
        key: "payments",
        label: "Payments",
        value: paymentsCount,
        buttonClass: "from-yellow-400 to-orange-500",
        segmentColor: "#F59E0B",
        route: "/inventory"
      },
      {
        key: "activeDevices",
        label: "Active Devices",
        value: activeDevices,
        buttonClass: "from-red-500 to-pink-500",
        segmentColor: "#EF4444",
        route: "/inventory"
      },
      {
        key: "availableDevices",
        label: "Available Devices",
        value: availableDevices,
        buttonClass: "from-purple-500 to-violet-500",
        segmentColor: "#8B5CF6",
        route: "/inventory"
      }
    ],
    [customers.length, inventory.length, paymentsCount, activeDevices, availableDevices]
  );

  const totalPieItems = stats.reduce((sum, item) => sum + item.value, 0) || 1;
  let currentAngle = 0;

  const pieSegments = stats.map((item) => {
    const percentage = (item.value / totalPieItems) * 100;
    const start = currentAngle;
    currentAngle += percentage;
    const end = currentAngle;
    return {
      ...item,
      start,
      end
    };
  });

  const pieGradient = pieSegments
    .map((segment) => `${segment.segmentColor} ${segment.start}% ${segment.end}%`)
    .join(", ");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    alert(`Searching for ${searchOption}: ${searchTerm}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Livetraq</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer bg-blue-500 p-2 rounded">Dashboard</li>
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
          <li className="cursor-pointer hover:bg-blue-500 p-2 rounded">Reports</li>
          <li className="cursor-pointer hover:bg-blue-500 p-2 rounded">Settings</li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-600">Quick access to customers and inventory stats</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{localStorage.getItem("role") === "admin" ? "Admin" : "User"}</span>
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

        <div className="p-6 overflow-y-auto">
          <div className="grid gap-6 mb-6">
            <form
              onSubmit={handleSearch}
              className="bg-white p-5 rounded shadow flex flex-col sm:flex-row gap-3 items-stretch"
            >
              <select
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
                className="w-full sm:w-48 p-3 border rounded"
              >
                <option>IMEI</option>
                <option>SIM</option>
                <option>CUSTOMER ID</option>
                <option>INVOICE NO</option>
                <option>GSTN</option>
              </select>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search by ${searchOption}`}
                className="flex-1 p-3 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
              >
                Search
              </button>
            </form>

            <div className="bg-white p-5 rounded shadow grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative w-64 h-64">
  {pieSegments.map((segment, index) => {
    const isActive = activeSegment === segment.key;

    return (
      <div
        key={segment.key}
        onClick={() => setActiveSegment(segment.key)}
        className={`absolute inset-0 rounded-full cursor-pointer transition-all duration-300 ${
          isActive ? "scale-110 shadow-2xl" : ""
        }`}
        style={{
          background: `conic-gradient(
            transparent 0% ${segment.start}%,
            ${segment.segmentColor} ${segment.start}% ${segment.end}%,
            transparent ${segment.end}% 100%
          )`,
          zIndex: index + 1,
          opacity: isActive ? 1 : 0.9
        }}
      />
    );
  })}

    <div className="absolute inset-0 m-10 rounded-full bg-white shadow-inner z-20" style={{ pointerEvents:"none"}}/>

      <div className="absolute inset-0 flex items-center justify-center z-30" style={{ pointerEvents:"none"}}>
        <div className="text-center">
             <div className="text-3xl font-bold text-gray-800">
                      {inventory.length}
                  </div>
                    <div className="text-sm text-gray-500">Devices</div>

                        {activeSegment && (
                        <div className="mt-2 text-xs font-semibold text-blue-600">
                        {
                          stats.find((s) => s.key === activeSegment)?.label
                        }
                        </div>
                    )}
                  </div>
                </div>
               </div>
                <p className="text-sm text-gray-600 text-center">
                  This chart represents the current dashboard totals. Click any stat below to jump to the related page.
                </p>
                <div className="w-full grid gap-2">
                  {stats.map((stat) => (
                    <div key={stat.key} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-br ${stat.buttonClass}`} />
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {stats.map((stat) => (
                  <button
                    key={stat.key}
                    onClick={() => navigate(stat.route)}
                    className="group bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm text-gray-700">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.buttonClass} flex flex-col items-center justify-center text-center p-2`}>
                      <span className="text-white text-sm font-semibold">{Math.round((stat.value / totalPieItems) * 100)}%</span>
                      <span className="text-[10px] leading-tight text-white/80 mt-1">{stat.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="bg-white p-5 rounded shadow text-center text-gray-600">Loading dashboard data...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
