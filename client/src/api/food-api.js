import instance from "./auth-api";

export const getAllFood = async () => {
  const { data } = await instance.get("/food/");
  return data;
};
