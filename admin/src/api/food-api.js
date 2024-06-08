import axios from "axios";

export const foodInstance = axios.create({
  baseURL: "https://food-delivery-mern-bhpe.onrender.com/api/food",
  // baseURL: "http://localhost:3000/api/food",
});

export const getAllFood = async () => {
  const { data } = await foodInstance.get("/");
  return data;
};

export const addFoodItem = async (data) => {
  const { data: result } = await foodInstance.post("/add", data);
  return result;
};

export const deleteFoodItem = async (id) => {
  const { data } = await foodInstance.delete(`/delete/${id}`);
  return data;
};
