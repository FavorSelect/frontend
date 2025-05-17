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

import resetPasswordReducer from "@/store/slices/auth/resetPasswordSlice";
import setPasswordReducer from "@/store/slices/auth/setPasswordSlice";
import productColorSelectorReducer from "@/store/slices/product-details/productColorSelectorSlice";
import productSizeSelectorReducer from "@/store/slices/product-details/productSizeSelectorSlice";
import productQuantityReducer from "@/store/slices/product-details/productQuantitySlice";
import productReviewReducer from "@/store/slices/product-details/productReviewSlice";
import cartReducer from "@/store/slices/cart/cartSlices";
import productViewReducer from "@/store/slices/product-view/productViewSlice";
import checkoutReducer from "@/store/slices/checkout/checkoutSlice";
import orderFilterReducer from "@/store/slices/dashboard/orderFilterSlice";
import reviewFilterReducer from "@/store/slices/dashboard/reviewFilterSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "signup",
    "login",
    "resetPassword",
    "productColorSelector",
    "productSizeSelector",
    "productQuantity",
    "productReview",
    "productView",
    "orderFilter",
    "reviewFilter",
  ],
};

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  resetPassword: resetPasswordReducer,
  setPassword: setPasswordReducer,
  productColorSelector: productColorSelectorReducer,
  productSizeSelector: productSizeSelectorReducer,
  productQuantity: productQuantityReducer,
  productReview: productReviewReducer,
  cartR: cartReducer,
  productView: productViewReducer,
  checkout: checkoutReducer,
  orderFilter: orderFilterReducer,
  reviewFilter: reviewFilterReducer,
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
