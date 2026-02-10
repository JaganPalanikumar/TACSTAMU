import { useAuth } from "../context/authContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
