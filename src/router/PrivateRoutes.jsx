import { Navigate, Outlet } from "react--router-dom";

const PrivateRoutes = ({ authStatus }) => {
  return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;