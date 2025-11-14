import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ authStatus }) => {
  return authStatus === "authenticated" ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;