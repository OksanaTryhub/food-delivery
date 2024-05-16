import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FoodDisplay = ({ category }) => {
  const { foodList, getTotalCartAmount, getTotalItemsQuantity } =
    useContext(StoreContext);

  return (
    <div className="relative container flex flex-col mx-auto mb-10 p-3">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold px-3 mb-4">
        Top dishes near you
      </h1>
      {getTotalItemsQuantity() > 0 && (
        <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-10 lg:bottom-10 bg-red-100 p-3 rounded-full z-40">
          <Link to="/cart">
            <FaCartShopping className="text-2xl hover:text-accent-1" />
          </Link>
          <div
            className={`w-3 h-3 bg-accent-1 rounded-full top-1 right-1 absolute flex items-center justify-center text-[10px] ${
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
