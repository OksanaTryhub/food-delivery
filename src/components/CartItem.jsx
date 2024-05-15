import { FaTrashCan } from "react-icons/fa6";
import PropTypes from "prop-types";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem = ({ image, name, price, quantity, total, removeItem, reduceItem, addItem }) => {
  return (
    <div className='grid grid-cols-cartItem items-center p-3'>
      <img src={image} alt='Food image' className='w-[50px] rounded-md' />
      <p>{name}</p>
      <p className='text-center'>${price}</p>
      <div className=' flex items-center justify-center gap-2 p-1 '>
        <div
          onClick={reduceItem}
          className=' p-3 bg-red-100  text-red-700 rounded-full  cursor-pointer'
        >
          <FaMinus />
        </div>
        <p className='font-semibold'>{quantity}</p>
        <div
          onClick={addItem}
          className=' p-3 bg-green-100 rounded-full text-green-700  cursor-pointer'
        >
          <FaPlus />
        </div>
      </div>
      <p className='text-center'>${total}</p>
      <button
        className='flex hover:text-accent-1 cursor-pointer justify-center '
        onClick={removeItem}
      >
        <FaTrashCan />
      </button>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  reduceItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default CartItem;
