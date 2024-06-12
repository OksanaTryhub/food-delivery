import { getFood } from "../food/food-selectors";

export const getLocalCartItems = ({ localCart }) => localCart.localCart || {};

export const getLocalCartTotalQuantity = ({ localCart }) =>
  Object.values(localCart.localCart || {}).reduce(
    (acc, value) => acc + value,
    0
  );

export const getTotalLocalCartAmount = (state) => {
  const cartItems = getLocalCartItems(state);
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
