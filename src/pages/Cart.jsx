import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems, foodList, removeFromCart, reduceItemQuantity, addToCart } =
    useContext(StoreContext);

  return (
    <section>
      <div className='container flex flex-col mx-auto p-3'>
        <div className='grid grid-cols-cartItem p-3 '>
          <p>Items</p>
          <p>Title</p>
          <p className='text-center'>Price</p>
          <p className='text-center'>Quantity</p>
          <p className='text-center'>Total</p>
          <p className='text-center'>Remove</p>
        </div>
        {/* <br /> */}
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <CartItem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  quantity={cartItems[item._id]}
                  total={item.price * cartItems[item._id]}
                  removeItem={() => removeFromCart(item._id)}
                  reduceItem={() => reduceItemQuantity(item._id)}
                  addItem={() => addToCart(item._id)}
                />
                <hr />
              </>
            );
          }
        })}
        <div>
          <h2>Cart Totals</h2>
          <div>
            <p>Subtotal</p>
            <p>{0}</p>
          </div>
          <hr />
          <div>
            <p>Delivery Fee</p>
            <p>{2}</p>
          </div>
          <hr />
          <div>
            <p>Total</p>
            <p>{0}</p>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div>
          <div>
            <p>If</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
