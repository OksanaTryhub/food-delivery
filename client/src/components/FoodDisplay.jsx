import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { isUserLogin } from "../redux/auth/auth-selectors.js";
import { getFood, isLoading, isError } from "../redux/food/food-selectors.js";
import {
  getCartItems,
  getCartTotalQuantity,
} from "../redux/cart/cart-selectors.js";

import FoodItem from "./FoodItem";
import Loader from "./Loader.jsx";
import { FaCartShopping } from "react-icons/fa6";
import {
  fetchAddItemToCart,
  fetchDecreaseCartItemQuantity,
  updateCartFromLocalStorage,
} from "../redux/cart/cart-operations.js";
import {
  addToCartLoc,
  clearCartLoc,
  decreaseCartItemLoc,
} from "../redux/cart/localCart-slice.js";
import {
  getLocalCartItems,
  getLocalCartTotalQuantity,
} from "../redux/cart/localCart-selectors.js";
import { useEffect, useState } from "react";

const FoodDisplay = ({ category }) => {
  const [cartData, setCartData] = useState({});
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const isLogin = useSelector(isUserLogin);
  const foodList = useSelector(getFood);
  const cartItems = useSelector(getCartItems);
  const localCartItems = useSelector(getLocalCartItems);
  const loading = useSelector(isLoading);
  const error = useSelector(isError);
  const totalItemsQuantity = useSelector(getCartTotalQuantity);
  const totalLocalItemsQuantity = useSelector(getLocalCartTotalQuantity);
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
    if (!isLogin && totalLocalItemsQuantity > 0) {
      setCartQuantity(totalLocalItemsQuantity);
    } else if (isLogin && totalItemsQuantity > 0) {
      setCartQuantity(totalItemsQuantity);
    } else {
      setCartQuantity(0);
    }
  }, [isLogin, totalItemsQuantity, totalLocalItemsQuantity]);

  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  const handleCartClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const removeFromCart = async (id) => {
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

  if (loading && !error) {
    return <Loader />;
  }

  return (
    <div className="relative container flex flex-col mx-auto mb-10 p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold px-3 mb-4">
        Top dishes near you
      </h1>
      {cartQuantity > 0 && (
        <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-10 lg:bottom-10 bg-red-100 p-5 rounded-full z-40">
          <Link to="/cart" onClick={handleCartClick}>
            <FaCartShopping className="text-3xl hover:text-accent-1" />
          </Link>
          <div
            className={`w-4 h-4 bg-accent-1 rounded-full top-3 right-3 absolute flex items-center justify-center text-[10px] ${
              cartQuantity === 0 ? "hidden" : ""
            }`}
          >
            {cartQuantity}
          </div>
        </div>
      )}
      <div className="grid grid-cols-custom gap-7 animate-fadeIn">
        {foodList.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                addToCart={() => addToCart(item._id)}
                removeFromCart={() => removeFromCart(item._id)}
                cartItems={cartData}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
