import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { adminCurrent } from "../redux/auth/auth-operations";

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminCurrent());
  }, []);

  return <>{children}</>;
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};
export default AuthLayout;
