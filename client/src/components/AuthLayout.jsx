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
import { fetchFood } from "../redux/food/food-operations";
import { fetchCartData } from "../redux/cart/cart-operations";

const AuthLayout = ({ children }) => {
  const isLogin = useSelector(isUserLogin);
  const loading = useSelector(isUserLoading);
  const error = useSelector(isUserError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userCurrent());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFood());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchCartData());
    }
  }, [dispatch, isLogin]);

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
