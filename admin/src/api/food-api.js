// import axios from "axios";
import instance from "./auth-api";

// export const foodInstance = axios.create({
//   baseURL: "https://food-delivery-mern-bhpe.onrender.com/api/food",
//   // baseURL: "http://localhost:3000/api/food",
// });

export const getAllFood = async () => {
  const { data } = await instance.get("/food/");
  return data;
};

export const addFoodItem = async (data) => {
  const { data: result } = await instance.post("/food/add", data);
  return result;
};

export const deleteFoodItem = async (id) => {
  const { data } = await instance.delete(`/food/delete/${id}`);
  return data;
};

export const updateFoodItem = async (id, updateData) => {
  const { data } = await instance.post(`/food/update/${id}`, updateData);
  return data;
};
