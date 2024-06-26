import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";
import foodReducer from "./food/food-slice";

const authPersistConfig = {
  key: "food-admin",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const rootReducer = combineReducers({
  authAdmin: persistedAuthReducer,
  food: foodReducer,
});
