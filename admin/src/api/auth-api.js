import axios from "axios";

const instance = axios.create({
  baseURL: "https://food-delivery-mern-bhpe.onrender.com/api",
  // baseURL: "http://localhost:3000/api",
});

export const setTokenAdmin = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

export const signupAdmin = async (data) => {
  const result = await instance.post("/admin/register", data);
  setTokenAdmin(result.data.token);
  return result;
};

export const loginAdmin = async (data) => {
  const result = await instance.post("/admin/login", data);
  setTokenAdmin(result.data.token);
  return result;
};

export const getCurrentAdmin = async (token) => {
  try {
    setTokenAdmin(token);
    const { data } = await instance.get("/admin/current");
    return data;
  } catch (error) {
    setTokenAdmin();
    throw error;
  }
};

export const updateAdmin = async (token, data) => {
  try {
    setTokenAdmin(token);
    const { data: result } = await instance.patch("/admin/update", data);
    return result;
  } catch (error) {
    setTokenAdmin();
    throw error;
  }
};

export const logout = async () => {
  const result = await instance.post("/admin/logout");
  setTokenAdmin();
  return result;
};

export const deleteAdmin = async (token) => {
  try {
    setTokenAdmin(token);
    const result = await instance.delete("/admin/delete");
    return result;
  } catch (error) {
    setTokenAdmin();
    throw error;
  }
};

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

// export const addToFavorite = async (id) => {
//   const { data: result } = await instance.post(`/notices/favorites/${id}`);
//   return result;
// };

// export const deleteFromFavorite = async (id) => {
//   const data = await instance.delete(`/notices/favorites/${id}`);

//   return data;
// };

export default instance;
