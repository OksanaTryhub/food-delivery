import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";
import foodReducer from "./food/food-slice";

const authPersistConfig = {
  key: "token",
  storage,
  whitelist: ["token", "isLogin"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const rootReducer = combineReducers({
  authUser: persistedAuthReducer,
  food: foodReducer,
});
