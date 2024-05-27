import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { isAdminLogin } from "../redux/auth/auth-selectors";

const PublicRoute = () => {
  const isLogin = useSelector(isAdminLogin);

  if (!isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/list" />;
  }
};

export default PublicRoute;
