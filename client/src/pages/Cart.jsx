import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import CartTotals from "../components/CartTotals";
import EmptyCart from "../components/EmptyCart";
import CartItemsList from "../components/CartItemsList";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartItems,
  getCartTotalQuantity,
  getTotalCartAmount,
  isCartError,
} from "./../redux/cart/cart-selectors";
import { getFood } from "../redux/food/food-selectors";
import Loader from "../components/Loader";
import {
  fetchAddToCart,
  fetchDeleteFromCart,
} from "./../redux/cart/cart-operations";
import { isUserLogin } from "../redux/auth/auth-selectors";
import { addToCartLoc, deleteFromCartLoc } from "../redux/cart/cart-slice";

const Cart = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const { removeFromCart, clearCart } = useContext(StoreContext);

  const getTotalAmount = useSelector(getTotalCartAmount);

  const isLogin = useSelector(isUserLogin);
  const foodList = useSelector(getFood);
  const cartItems = useSelector(getCartItems);
  console.log("🚀 ~ Cart ~ cartItems:", cartItems);
  const isError = useSelector(isCartError);
  const totalQuantity = useSelector(getCartTotalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems) {
      setDataFetched(true);
    }
  }, [cartItems]);

  const addToCart = async (id) => {
    if (!isLogin) {
      dispatch(addToCartLoc({ itemId: id }));
    } else {
      try {
        await dispatch(fetchAddToCart(id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const reduceItem = async (id) => {
    if (!isLogin) {
      dispatch(deleteFromCartLoc({ itemId: id }));
    } else {
      try {
        await dispatch(fetchDeleteFromCart(id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (!dataFetched && !isError) {
    <Loader />;
  }

  return (
    <section className="pt-[100px]">
      <div className="container flex flex-col mx-auto p-3">
        {dataFetched && totalQuantity > 0 ? (
          <>
            <div className="grid grid-cols-cartItemXS sm:grid-cols-cartItem p-3  text-lg text-gray-400">
              <p className="pl-2">Items</p>
              <div className="flex flex-col sm:hidden">
                <p className="pl-2">Title/Total</p>
              </div>
              <p className="hidden sm:block">Title</p>
              <p className="hidden sm:block text-center">Price</p>
              <p className="pl-2">Quantity</p>
              <p className="hidden sm:block text-center">Total</p>
              <p className="hidden sm:block text-center">Remove</p>
            </div>
            <hr />
            <CartItemsList
              foodList={foodList}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              reduceItem={reduceItem}
              addToCart={addToCart}
              clearCart={clearCart}
            />
            <button
              onClick={() => navigate("/")}
              className="self-center px-6 py-2 mt-5 border rounded-full bg-light-1 hover:border-accent-1 transition-colors duration-300 ease-in-out"
            >
              CONTINUE CHOOSING FOOD
            </button>
          </>
        ) : (
          <EmptyCart />
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:gap-20 mt-10 sm:mt-20 gap-10">
          <CartTotals
            amount={getTotalAmount}
            buttonText={"PROCEED TO CHECKOUT"}
            onClick={() => navigate("/order")}
            className="flex-1"
          />
          <div className="flex flex-col flex-1 max-w-[400px] w-full sm:max-w-none mx-auto gap-5 p-3">
            <p className="text-center sm:text-start">
              If you have a promo code, enter it here
            </p>
            <input
              type="text"
              placeholder="Promo code"
              className="w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
            <button className="mx-auto px-6 py-2 border rounded-full bg-light-1 hover:border-accent-1 transition-colors duration-300 ease-in-out">
              APPLY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
