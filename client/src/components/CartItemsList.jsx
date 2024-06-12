import CartItem from "./CartItem";
import CartItemXS from "./CartItemXS";
import { FaTrashCan } from "react-icons/fa6";
import PropTypes from "prop-types";

const CartItemsList = ({
  foodList,
  cartItems,
  removeFromCart,
  reduceItem,
  addToCart,
  clearCart,
}) => {
  return (
    <>
      {foodList.map((item) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={item._id}>
              <CartItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={cartItems[item._id]}
                total={item.price * cartItems[item._id]}
                removeItem={() => removeFromCart(item._id)}
                reduceItem={() => reduceItem(item._id)}
                addItem={() => addToCart(item._id)}
                className="hidden sm:grid"
              />
              <CartItemXS
                id={item._id}
                image={item.image}
                name={item.name}
                quantity={cartItems[item._id]}
                total={item.price * cartItems[item._id]}
                reduceItem={() => reduceItem(item._id)}
                addItem={() => addToCart(item._id)}
                className="grid sm:hidden"
              />
              <hr />
            </div>
          );
        }
      })}

      <button
        title="Clear cart"
        className="sm:hidden hover:text-accent-1 cursor-pointer justify-center ml-auto mr-5 my-5 "
        onClick={clearCart}
      >
        <FaTrashCan />
      </button>
    </>
  );
};

CartItemsList.propTypes = {
  foodList: PropTypes.array.isRequired,
  cartItems: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  reduceItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default CartItemsList;
