import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./context/userContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) return <Navigate to={"/calendar-routine"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
