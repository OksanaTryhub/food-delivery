import { getFood } from "../food/food-selectors";

export const getCartItems = ({ cart }) => cart.cart || {};
export const isCartLoading = ({ cart }) => cart.loading;
export const isCartError = ({ cart }) => cart.error;

export const getCartTotalQuantity = ({ cart }) =>
  Object.values(cart.cart || {}).reduce((acc, value) => acc + value, 0);

export const getTotalCartAmount = (state) => {
  const cartItems = getCartItems(state);
  const foodList = getFood(state);

  let totalAmount = 0;

  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      const itemInfo = foodList.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
  }
  return totalAmount;
};
