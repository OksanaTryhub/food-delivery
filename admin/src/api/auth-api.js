import axios from "axios";

export const instance = axios.create({
  baseURL: "https://food-delivery-mern-bhpe.onrender.com/api/admin",
});

export const setTokenAdmin = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

export const signupAdmin = async (data) => {
  const result = await instance.post("/register", data);
  setTokenAdmin(result.data.token);
  return result;
};

export const loginAdmin = async (data) => {
  const result = await instance.post("/login", data);
  setTokenAdmin(result.data.token);
  return result;
};

export const getCurrentAdmin = async (token) => {
  try {
    setTokenAdmin(token);
    const { data } = await instance.get("/current");
    return data;
  } catch (error) {
    setTokenAdmin();
    throw error;
  }
};

export const updateAdmin = async (token, data) => {
  try {
    setTokenAdmin(token);
    const { data: result } = await instance.patch("/update", data);
    return result;
  } catch (error) {
    setTokenAdmin();
    throw error;
  }
};

export const logout = async () => {
  const result = await instance.post("/logout");
  setTokenAdmin();
  return result;
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
