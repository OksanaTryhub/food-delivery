import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLogin } from "../redux/auth/auth-selectors";

const PrivateRoute = () => {
  const isLogin = useSelector(isUserLogin);

  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
