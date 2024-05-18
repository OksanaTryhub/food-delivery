import PropTypes from "prop-types";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem = ({ image, name, quantity, total, reduceItem, addItem, className }) => {
  return (
    <div
      className={`grid grid-cols-cartItemXS grid-rows-[1fr,1fr] items-center gap-1 p-1 ${className}`}
    >
      <img src={image} alt='Food image' className='row-span-2 col-span-1 w-[70px] rounded-md' />
      <p className='row-span-1 col-span-2 '>{name}</p>
      <p className='font-medium text-lg '>${total}</p>
      <div className='min-w-[85px] flex items-center justify-between mr-auto'>
        <div
          onClick={reduceItem}
          className=' p-2 bg-red-100  text-red-700 rounded-full  cursor-pointer'
        >
          <FaMinus />
        </div>
        <p className='font-medium'>{quantity}</p>
        <div
          onClick={addItem}
          className=' p-2 bg-green-100 rounded-full text-green-700  cursor-pointer'
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  reduceItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CartItem;
