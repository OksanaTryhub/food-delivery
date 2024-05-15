import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import CartItem from "../components/CartItem";
import CartItemXS from "../components/CartItemXS";
import { FaTrashCan } from "react-icons/fa6";
import CartTotals from "../components/CartTotals";

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    reduceItemQuantity,
    addToCart,
    getTotalCartAmount,
    clearCart,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <section>
      <div className='container flex flex-col mx-auto p-3'>
        <div className='grid grid-cols-cartItemXS sm:grid-cols-cartItem p-3  text-lg text-gray-400'>
          <p className='pl-2'>Items</p>
          <div className='flex flex-col sm:hidden'>
            <p className='pl-2'>Title/Total</p>
          </div>
          <p className='hidden sm:block'>Title</p>
          <p className='hidden sm:block text-center'>Price</p>
          <p className='pl-2'>Quantity</p>
          <p className='hidden sm:block text-center'>Total</p>
          <p className='hidden sm:block text-center'>Remove</p>
        </div>
        <hr />
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
                  reduceItem={() => reduceItemQuantity(item._id)}
                  addItem={() => addToCart(item._id)}
                  className='hidden sm:grid'
                />
                <CartItemXS
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  quantity={cartItems[item._id]}
                  total={item.price * cartItems[item._id]}
                  reduceItem={() => reduceItemQuantity(item._id)}
                  addItem={() => addToCart(item._id)}
                  className='grid sm:hidden'
                />
                <hr />
              </div>
            );
          }
        })}

        <button
          title='Clear cart'
          className='sm:hidden hover:text-accent-1 cursor-pointer justify-center ml-auto mr-5 my-5 '
          onClick={clearCart}
        >
          <FaTrashCan />
        </button>

        <div className='flex flex-col-reverse sm:flex-row sm:gap-20 mt-10 sm:mt-20 gap-10'>
          <CartTotals
            amount={getTotalCartAmount()}
            buttonText={"PROCEED TO CHECKOUT"}
            onClick={() => navigate("/order")}
            className='flex-1'
          />
          <div className='flex flex-col flex-1 max-w-[400px] w-full sm:max-w-none mx-auto gap-5 p-3'>
            <p className='text-center sm:text-start'>If you have a promo code, enter it here</p>
            <input
              type='text'
              placeholder='Promo code'
              className='w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border '
            />
            <button className='mx-auto px-6 py-2 border rounded-full bg-light-1 hover:border-accent-1 transition-colors duration-300 ease-in-out'>
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
