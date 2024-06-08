// import instance from "./auth-api";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://food-delivery-mern-bhpe.onrender.com/api/food",
  // baseURL: "http://localhost:3000/api",
});

export const getAllFood = async () => {
  const { data } = await instance.get("/");
  return data;
};
