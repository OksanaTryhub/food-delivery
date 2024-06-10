import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { userCurrent } from "../redux/auth/auth-operations";
import {
  isUserError,
  isUserLoading,
  isUserLogin,
} from "../redux/auth/auth-selectors";
import Loader from "./Loader";

const AuthLayout = ({ children }) => {
  const isLogin = useSelector(isUserLogin);
  const loading = useSelector(isUserLoading);
  const error = useSelector(isUserError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userCurrent());
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
