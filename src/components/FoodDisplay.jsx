import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import PropTypes from "prop-types";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className='container flex flex-col mx-auto mb-10 p-3'>
      <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold px-3 mb-4'>
        Top dishes near you
      </h1>
      <div className='grid grid-cols-custom gap-7 animate-fadeIn'>
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
