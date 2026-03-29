import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCustomer from "./pages/AddCustomer";
import CustomerList from "./pages/CustomerList";
import CustomerDetails from "./pages/CustomerDetails";
import EditCustomer from "./pages/EditCustomer";
import ProtectedRoute from "./components/ProtectedRoute";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
         path="/dashboard"
         element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
         }
/>
      <Route path="/add-customer" element={<ProtectedRoute><AddCustomer /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
      <Route path="/customer/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
      <Route path="/edit-customer/:id" element={<ProtectedRoute><EditCustomer /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;