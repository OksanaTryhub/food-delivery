import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  getFood,
  // isLoading,
  // isError,
  // isSuccess,
} from "../redux/food/food-selectors.js";
import { fetchFood } from "../redux/food/food-operations.js";

const FoodDisplay = ({ category }) => {
  const { getTotalCartAmount, getTotalItemsQuantity } =
    useContext(StoreContext);

  const foodList = useSelector(getFood);
  // const loading = useSelector(isLoading);
  // const error = useSelector(isError);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchFood());
  }, [dispatch]);

  return (
    <div className="relative container flex flex-col mx-auto mb-10 p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold px-3 mb-4">
        Top dishes near you
      </h1>
      {getTotalItemsQuantity() > 0 && (
        <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-10 lg:bottom-10 bg-red-100 p-5 rounded-full z-40">
          <Link to="/cart" onClick={handleCartClick}>
            <FaCartShopping className="text-3xl hover:text-accent-1" />
          </Link>
          <div
            className={`w-4 h-4 bg-accent-1 rounded-full top-3 right-3 absolute flex items-center justify-center text-[10px] ${
              getTotalCartAmount() === 0 && "hidden"
            }`}
          >
            {getTotalItemsQuantity()}
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
