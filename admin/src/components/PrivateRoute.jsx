import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import {
  isAdminLogin,
  isLoading,
  getToken,
} from "../redux/auth/auth-selectors";
import Loader from "./Loader";

const PrivateRoute = () => {
  const isLogin = useSelector(isAdminLogin);
  const isAdminLoading = useSelector(isLoading);
  const isToken = useSelector(getToken);

  if (!isLogin && isAdminLoading && isToken) {
    return <Loader />;
  }

  if (isLogin) {
    return <Outlet />;
  }

  if (!isLogin && !isAdminLoading && !isToken) {
    return <Navigate to="/admin" />;
  }
};

export default PrivateRoute;
