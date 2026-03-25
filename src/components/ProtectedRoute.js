import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // 🔥 Check properly
  if (!token || token === "undefined") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;