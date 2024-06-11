import axios from "axios";

export const instance = axios.create({
  // baseURL: "https://food-delivery-mern-bhpe.onrender.com/api",
  baseURL: "http://localhost:3000/api",
});

export const setTokenUser = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

export const signupUser = async (data) => {
  const { data: result } = await instance.post("/user/register", data);
  setTokenUser(result.token);
  return result;
};

export const loginUser = async (data) => {
  const { data: result } = await instance.post("/user/login", data);
  setTokenUser(result.token);
  return result;
};

export const getCurrentUser = async (token) => {
  try {
    setTokenUser(token);
    const { data } = await instance.get("/user/current");
    return data;
  } catch (error) {
    setTokenUser();
    throw error;
  }
};

export const updateUser = async (token, data) => {
  try {
    setTokenUser(token);
    const { data: result } = await instance.patch("/user/profile", data);
    return result;
  } catch (error) {
    setTokenUser();
    throw error;
  }
};

export const logoutUser = async () => {
  const { data } = await instance.post("/user/logout");
  setTokenUser();
  return data;
};

export const deleteUser = async (token) => {
  try {
    setTokenUser(token);
    const result = await instance.delete("/user/profile");
    return result;
  } catch (error) {
    setTokenUser();
    throw error;
  }
};

// export const updateAvatar = async (token, data) => {
//   try {
//     setTokenUser(token);
//     const { data: result } = await instance.patch("/user/avatars", data);
//     return result;
//   } catch (error) {
//     setTokenUser();
//     throw error;
//   }
// };

export default instance;
