import axios from "axios";

export const instance = axios.create({
  baseURL: "https://food-delivery-mern-bhpe.onrender.com/api",
});

export const getAllFood = async () => {
  const { data } = await instance.get("/food");
  return data;
};
