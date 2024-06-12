import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCartItems,
  getTotalCartAmount,
  isCartError,
  isCartLoading,
} from "./../redux/cart/cart-selectors";
import { getFood } from "../redux/food/food-selectors";
import { isUserLogin } from "../redux/auth/auth-selectors";
import {
  getLocalCartItems,
  getTotalLocalCartAmount,
} from "../redux/cart/localCart-selectors";

import {
  fetchAddItemToCart,
  fetchClearCart,
  fetchDecreaseCartItemQuantity,
  fetchDeleteFromCart,
  updateCartFromLocalStorage,
} from "./../redux/cart/cart-operations";
import {
  addToCartLoc,
  clearCartLoc,
  decreaseCartItemLoc,
  deleteItemCartLoc,
} from "../redux/cart/localCart-slice";

import CartTotals from "../components/CartTotals";
import EmptyCart from "../components/EmptyCart";
import CartItemsList from "../components/CartItemsList";
import Loader from "../components/Loader";

const Cart = () => {
  const [cartData, setCartData] = useState({});
  const [cartUpdated, setCartUpdated] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const totalCartAmount = useSelector(getTotalCartAmount);
  const totalLocalAmount = useSelector(getTotalLocalCartAmount);
  const isLogin = useSelector(isUserLogin);
  const foodList = useSelector(getFood);
  const isLoading = useSelector(isCartLoading);
  const cartItems = useSelector(getCartItems);
  const localCartItems = useSelector(getLocalCartItems);
  const isError = useSelector(isCartError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      if (localCartItems && Object.values(localCartItems).length > 0) {
        dispatch(updateCartFromLocalStorage(localCartItems))
          .then(() => {
            localStorage.removeItem("localCart");
            dispatch(clearCartLoc());
            setCartUpdated(true);
          })
          .catch((error) => {
            console.log("Error updating cart from local storage", error);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (!isLogin && !isEmpty(localCartItems)) {
      setCartData(localCartItems);
    } else if (!isLogin && isEmpty(localCartItems)) {
      setCartData({});
    } else if (isLogin && !isEmpty(cartItems)) {
      setCartData(cartItems);
    } else if (isLogin && isEmpty(cartItems)) {
      setCartData({});
    }
  }, [isLogin, cartItems, localCartItems, cartUpdated]);

  useEffect(() => {
    if (isEmpty(cartData)) {
      setTotalAmount(0);
    } else if (!isEmpty(localCartItems)) {
      setTotalAmount(totalLocalAmount);
    } else if (!isEmpty(cartItems)) {
      setTotalAmount(totalCartAmount);
    } else {
      setTotalAmount(0);
    }
  }, [
    isLogin,
    cartItems,
    localCartItems,
    cartUpdated,
    totalLocalAmount,
    totalCartAmount,
    cartData,
  ]);

  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  const addToCart = async (id) => {
    if (!isLogin) {
      dispatch(addToCartLoc({ itemId: id }));
    } else {
      try {
        await dispatch(fetchAddItemToCart(id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const reduceItem = async (id) => {
    if (!isLogin) {
      dispatch(decreaseCartItemLoc({ itemId: id }));
    } else {
      try {
        await dispatch(fetchDecreaseCartItemQuantity(id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const removeFromCart = async (id) => {
    if (!isLogin) {
      dispatch(deleteItemCartLoc({ itemId: id }));
    } else {
      try {
        await dispatch(fetchDeleteFromCart(id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (isLoading && !isError) {
    <Loader />;
  }

  const clearCart = async () => {
    if (!isLogin) {
      dispatch(clearCartLoc());
    } else {
      try {
        await dispatch(fetchClearCart());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="pt-[100px]">
      <div className="container flex flex-col mx-auto p-3">
        {Object.keys(cartData).length > 0 ? (
          <>
            <div className="grid grid-cols-cartItemXS sm:grid-cols-cartItem p-3  text-lg text-gray-400">
              <p className="pl-2">Items</p>
              <div className="flex flex-col sm:hidden">
                <p className="pl-2">Title/Total</p>
              </div>
              <p className="hidden sm:block">Title</p>
              <p className="hidden sm:block text-center">Price</p>
              <p className="pl-2">Quantity</p>
              <p className="hidden sm:block text-center">Total</p>
              <p className="hidden sm:block text-center">Remove</p>
            </div>
            <hr />
            <CartItemsList
              foodList={foodList}
              cartItems={cartData}
              removeFromCart={removeFromCart}
              reduceItem={reduceItem}
              addToCart={addToCart}
              clearCart={clearCart}
            />
            <button
              onClick={() => navigate("/")}
              className="self-center px-6 py-2 mt-5 border rounded-full bg-light-1 hover:border-accent-1 transition-colors duration-300 ease-in-out"
            >
              CONTINUE CHOOSING FOOD
            </button>
          </>
        ) : (
          <EmptyCart />
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:gap-20 mt-10 sm:mt-20 gap-10">
          <CartTotals
            amount={totalAmount}
            buttonText={"PROCEED TO CHECKOUT"}
            onClick={() => navigate("/order")}
            className="flex-1"
          />
          <div className="flex flex-col flex-1 max-w-[400px] w-full sm:max-w-none mx-auto gap-5 p-3">
            <p className="text-center sm:text-start">
              If you have a promo code, enter it here
            </p>
            <input
              type="text"
              placeholder="Promo code"
              className="w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
            <button className="mx-auto px-6 py-2 border rounded-full bg-light-1 hover:border-accent-1 transition-colors duration-300 ease-in-out">
              APPLY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
