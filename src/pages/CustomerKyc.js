
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  List,
  Users,
  BadgeCheck,
} from "lucide-react";

const CustomerKyc = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Customer KYC
            </h1>
            <p className="text-gray-500 mt-1">
              Manage customer verification and records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h3 className="font-semibold text-gray-800">Admin</h3>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
              A
            </div>
          </div>
        </div>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-3 gap-6 p-8 bg-gradient-to-r from-blue-50 to-white">

          {/* CARD 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Users size={30} />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Total Customers</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
              <span className="text-sm text-gray-400">
                Registered customers
              </span>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
              <BadgeCheck size={30} />
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">KYC Verified</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1">1</p>
              <span className="text-sm text-gray-400">
                Verified customers
              </span>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="hidden lg:flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="KYC"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="px-8 pb-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/add-customer")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <UserPlus size={20} />
            Add New Customer
          </button>

          <button
            onClick={() => navigate("/customers")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <List size={20} />
            View Customer List
          </button>
        </div>

        {/* BUTTONS */}
        <div className="px-8 pb-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/add-customer")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <UserPlus size={20} />
            Add New Customer
          </button>

          <button
            onClick={() => navigate("/customers")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <List size={20} />
            View Customer List
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all"
          >
            <List size={20} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerKyc;

