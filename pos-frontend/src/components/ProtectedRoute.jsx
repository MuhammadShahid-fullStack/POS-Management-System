import { Navigate } from "react-router-dom";
import { hasPermission } from "../utils/permissions";

function ProtectedRoute({ children, permission }) {
  const token = localStorage.getItem("token");

  // Login check
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Permission check
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;