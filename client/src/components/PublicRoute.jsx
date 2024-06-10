import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLogin } from "../redux/auth/auth-selectors";

const PublicRoute = () => {
  const isLogin = useSelector(isUserLogin);

  if (!isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;
