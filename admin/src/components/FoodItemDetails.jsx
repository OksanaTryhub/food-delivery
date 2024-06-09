import PropTypes from "prop-types";
import Modal from "./Modal";
import { useEffect } from "react";
import { GrUpdate } from "react-icons/gr";
import { FaTrashCan } from "react-icons/fa6";

const FoodItemDetails = ({ isOpen, item, updateFoodItem, removeFoodItem }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      bgClassName="flex items-center justify-center w-full h-screen"
      contentClassName="relative flex flex-col items-center bg-light-1 rounded-lg w-[95%] max-w-[400px] sm:max-w-[500px] md:max-w-[600px] xl:max-w-[700px] p-4 animate-fadeIn"
    >
      <img src={item.image} alt="Item image" className="w-screen" />
      <div className="flex flex-col sm:flex-row w-full">
        <div className="flex flex-col gap-4 w-full sm:w-[75%] p-4">
          <p className="font-semibold ">Name: {item.name}</p>
          <div>
            <span className="font-semibold ">Decsription: </span>
            {item.description}
          </div>
          <p>
            <span className="font-semibold ">Category: </span>
            {item.category}
          </p>
          <p>
            <span className="font-semibold ">Price: </span>${item.price}
          </p>
        </div>
        <div className="flex justify-between self-center sm:self-end p-4 sm:pr-8 sm:pb-8 w-[50%] sm:w-[25%]">
          <button
            className=" flex hover:text-green-500 cursor-pointer justify-center text-lg "
            onClick={updateFoodItem}
            title="Update Food Item"
          >
            <GrUpdate />
          </button>
          <button
            className=" flex hover:text-accent-1 cursor-pointer justify-center text-lg "
            onClick={removeFoodItem}
            title="Delete Food Item"
          >
            <FaTrashCan />
          </button>
        </div>
      </div>
    </Modal>
  );
};

FoodItemDetails.propTypes = {
  isOpen: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  updateFoodItem: PropTypes.func.isRequired,
  removeFoodItem: PropTypes.func.isRequired,
};
export default FoodItemDetails;
