// import instance from "./auth-api";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAllFood = async () => {
  const { data } = await instance.get("/food");
  console.log("🚀 ~ getAllFood ~ data:", data);
  return data;
};
