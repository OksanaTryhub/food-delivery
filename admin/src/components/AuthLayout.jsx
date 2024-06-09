import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { adminCurrent } from "../redux/auth/auth-operations";
import { isError, isLoading, isAdminLogin } from "../redux/auth/auth-selectors";
import Loader from "./Loader";

const AuthLayout = ({ children }) => {
  const isLogin = useSelector(isAdminLogin);
  const loading = useSelector(isLoading);
  const error = useSelector(isError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminCurrent());
  }, []);

  if (loading && !isLogin && !error) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Loader size="40" />
      </div>
    );
  }

  return <>{children}</>;
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};
export default AuthLayout;
