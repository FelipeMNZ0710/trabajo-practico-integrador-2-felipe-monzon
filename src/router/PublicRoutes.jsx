import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const PublicRoutes = ({ authStatus }) => {
  if (authStatus === "checking") return <Loading />;
  return authStatus === "authenticated" ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
