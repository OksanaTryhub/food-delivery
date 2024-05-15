import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import foodList from "./../data/foodList";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const reduceItemQuantity = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  useEffect(() => {
    console.log("🚀 ~ StoreContextProvider ~ cartItems:", cartItems);
  }, [cartItems]);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    reduceItemQuantity,
    removeFromCart,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

StoreContextProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreContextProvider;
