import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "@/store/api/api";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import signupReducer from "@/store/slices/signupSlice";
import loginReducer from "@/store/slices/loginSlice";
import resetPasswordReducer from "@/store/slices/resetPasswordSlice";
import setPasswordReducer from "@/store/slices/setPasswordSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["signup", "login", "resetPassword"],
};

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  signup: signupReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  setPassword: setPasswordReducer,
};

const combinedReducer = combineReducers(rootReducer);
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
