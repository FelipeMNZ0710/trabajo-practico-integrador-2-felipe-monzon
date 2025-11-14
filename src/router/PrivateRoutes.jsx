import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRoutes = ({ authStatus }) => {
  if (authStatus === "checking") return <Loading />;
  return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
