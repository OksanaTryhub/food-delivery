import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";
import foodReducer from "./food/food-slice";
import cartReducer from "./cart/cart-slice";
import localCartReducer from "./cart/localCart-slice";

const authPersistConfig = {
  key: "food-user",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const rootReducer = combineReducers({
  authUser: persistedAuthReducer,
  food: foodReducer,
  cart: cartReducer,
  localCart: localCartReducer,
});
