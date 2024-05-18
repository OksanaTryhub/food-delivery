import { useContext } from "react";
import { CiStar } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import PropTypes from "prop-types";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, reduceItemQuantity } = useContext(StoreContext);

  const handleStarClick = () => {};

  return (
    <div className='group flex flex-col items-center justify-center border rounded-lg overflow-hidden shadow-md hover:shadow-xl'>
      <div className='relative w-full overflow-hidden'>
        <img
          src={image}
          alt='Food image'
          className='w-full h-full group-hover:scale-110 transition-scale duration-500 ease-in-out'
        />
        {!cartItems[id] ? (
          <div
            onClick={() => addToCart(id)}
            className='absolute bottom-4 right-4 p-4 bg-light-1 rounded-full cursor-pointer z-30'
          >
            <FaPlus />
          </div>
        ) : (
          <div className='absolute bottom-4 right-4 flex items-center gap-2 p-1 bg-white rounded-full  z-30'>
            <div
              onClick={() => reduceItemQuantity(id)}
              className=' p-3 bg-red-100  text-red-700 rounded-full  cursor-pointer'
            >
              <FaMinus />
            </div>
            <p className='font-semibold'>{cartItems[id]}</p>
            <div
              onClick={() => addToCart(id)}
              className=' p-3 bg-green-100 rounded-full text-green-700  cursor-pointer'
            >
              <FaPlus />
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-3 w-full sm:max-w-[360px] p-4 grow'>
        <div className='flex items-center lg:items-start justify-between '>
          <p className=' font-semibold text-lg md:text-xl lg:text-2xl'>{name}</p>
          <div className='flex text-base md:text-lg lg:text-xl lg:pt-1'>
            <CiStar onClick={handleStarClick} />
            <CiStar onClick={handleStarClick} />
            <CiStar onClick={handleStarClick} />
            <CiStar onClick={handleStarClick} />
            <CiStar onClick={handleStarClick} />
          </div>
        </div>
        <div className='flex flex-col gap-3 mt-auto'>
          <p className='text-sm font-medium'>{description}</p>
          <p className='text-base md:text-lg lg:text-xl font-semibold text-accent-1'>${price}</p>
        </div>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItem;
