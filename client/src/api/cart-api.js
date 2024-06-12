import instance from "./auth-api";

export const addToCart = async (id) => {
  const { data } = await instance.post("/cart/add", { itemId: id });
  return data;
};

export const decreaseCartItem = async (id) => {
  const { data } = await instance.post("/cart/delete", { itemId: id });
  return data;
};

export const deleteCartItem = async (id) => {
  const { data } = await instance.delete(`/cart/delete/${id}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await instance.delete("/cart/clear-cart");
  return data;
};
export const getCartItems = async () => {
  const { data } = await instance.get("/cart/");
  return data;
};

//WOKR WITH LOCAL STORAGE
export const updateCartFromLocal = async (data) => {
  const result = await instance.post("/cart/update-cart", data);
  return result;
};
