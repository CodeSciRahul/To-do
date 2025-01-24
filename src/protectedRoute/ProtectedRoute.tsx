// Common Shared component to protect Route from unauthorized users.

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Define props for the ProtectedRoute component
type ProtectedRouteProps = {
  isAuthenticated: boolean | null; // Flag to check if user is authenticated
  redirectPath?: string; // Optional path to redirect the user if not authenticated
  children?: React.ReactNode; // Optional children to render if authenticated
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectPath = "/login", // Default redirect path is '/login'
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If user is authenticated, render children or outlet (for nested routes)
  return children ? <>{children}</> : <Outlet />; 
};

export default ProtectedRoute; 
