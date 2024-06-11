import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import {
  isUserLogin,
  isUserLoading,
  getUserToken,
} from "../redux/auth/auth-selectors";
import Loader from "./Loader";

const PrivateRoute = () => {
  const isLogin = useSelector(isUserLogin);
  const isLoading = useSelector(isUserLoading);
  const isToken = useSelector(getUserToken);

  if (!isLogin && isLoading && isToken) {
    return <Loader />;
  }

  if (isLogin) {
    return <Outlet />;
  }

  if (!isLogin && !isLoading && !isToken) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
