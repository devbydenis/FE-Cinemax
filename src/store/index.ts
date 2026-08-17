import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/features/auth/store/userSlice";
import orderReducer from "@/features/order/store/orderSlice";
import adminReducer from "@/features/admin/store/adminSlice";

/**
 * Persist config dengan versioning (client-localstorage-schema):
 * bump `version` saat bentuk state berubah agar localStorage lama
 * tidak dipakai ulang dengan schema yang sudah usang.
 */
const persistConfig = {
  key: "cinemax-root",
  version: 1,
  storage,
  whitelist: ["user", "order", "admin"],
};

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  admin: adminReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
