import axios from "axios";

export const instance = axios.create({
  baseURL: "https://food-delivery-mern-bhpe.onrender.com/api",
  // baseURL: "http://localhost:3000/api",
});

export const setToken = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

export const signup = async (data) => {
  const { data: result } = await instance.post("/user/register", data);
  setToken(result.token);
  return result;
};

export const login = async (data) => {
  const { data: result } = await instance.post("/user/login", data);
  setToken(result.token);
  return result;
};

// export const getCurrent = async (token) => {
//   try {
//     setToken(token);
//     const { data } = await instance.get("/user/current");
//     return data;
//   } catch (error) {
//     setToken();
//     throw error;
//   }
// };

// export const updateUser = async (token, data) => {
//   try {
//     setToken(token);
//     const { data: result } = await instance.patch("/user", data);
//     return result;
//   } catch (error) {
//     setToken();
//     throw error;
//   }
// };

// export const updateAvatar = async (token, data) => {
//   try {
//     setToken(token);
//     const { data: result } = await instance.patch("/user/avatars", data);
//     return result;
//   } catch (error) {
//     setToken();
//     throw error;
//   }
// };

// export const logout = async () => {
//   const { data } = await instance.post("/user/logout");
//   setToken();
//   return data;
// };

// export const addToFavorite = async (id) => {
//   const { data: result } = await instance.post(`/notices/favorites/${id}`);
//   return result;
// };

// export const deleteFromFavorite = async (id) => {
//   const data = await instance.delete(`/notices/favorites/${id}`);

//   return data;
// };

export default instance;
