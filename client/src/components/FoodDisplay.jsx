import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { isUserLogin } from "../redux/auth/auth-selectors.js";
import { getFood, isLoading, isError } from "../redux/food/food-selectors.js";
import { getCartItems } from "../redux/cart/cart-selectors.js";

import FoodItem from "./FoodItem";
import Loader from "./Loader.jsx";
import { FaCartShopping } from "react-icons/fa6";
import {
  fetchAddToCart,
  fetchDeleteFromCart,
} from "../redux/cart/cart-operations.js";

const FoodDisplay = ({ category }) => {
  const [totalItemsQuantity, setTotalItemsQuantity] = useState(0);
  const isLogin = useSelector(isUserLogin);
  const foodList = useSelector(getFood);
  const cartData = useSelector(getCartItems);
  const loading = useSelector(isLoading);
  const error = useSelector(isError);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalItemsQuantity(
      Object.values(cartData).reduce((acc, value) => acc + value, 0)
    );
  }, [cartData]);

  const handleCartClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = async (id) => {
    try {
      await dispatch(fetchAddToCart(id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await dispatch(fetchDeleteFromCart(id));
    } catch (error) {
      console.log(error.message);
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
      {isLogin && totalItemsQuantity > 0 && (
        <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-10 lg:bottom-10 bg-red-100 p-5 rounded-full z-40">
          <Link to="/cart" onClick={handleCartClick}>
            <FaCartShopping className="text-3xl hover:text-accent-1" />
          </Link>
          <div
            className={`w-4 h-4 bg-accent-1 rounded-full top-3 right-3 absolute flex items-center justify-center text-[10px] ${
              totalItemsQuantity === 0 && "hidden"
            }`}
          >
            {totalItemsQuantity}
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
