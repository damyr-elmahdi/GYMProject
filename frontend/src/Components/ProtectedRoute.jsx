import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user } = useContext(AppContext);


  if (!token) {
    return <Navigate to="/login-register" replace />;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  // Check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/client/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;