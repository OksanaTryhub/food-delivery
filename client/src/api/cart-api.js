import instance from "./auth-api";

export const addToCart = async (id) => {
  const { data } = await instance.post("/cart/add", { itemId: id });
  return data;
};

export const deleteFromCart = async (id) => {
  const { data } = await instance.post("/cart/delete", { itemId: id });
  return data;
};

export const getCartItems = async () => {
  const { data } = await instance.get("/cart/");
  return data;
};
