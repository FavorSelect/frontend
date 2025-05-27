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
import hamburgerReducer from "@/store/slices/humburger/hamburgerSlice";
import resetPasswordReducer from "@/store/slices/user/resetPasswordSlice";
import setPasswordReducer from "@/store/slices/user/setPasswordSlice";
import productColorSelectorReducer from "@/store/slices/product-details/productColorSelectorSlice";
import productSizeSelectorReducer from "@/store/slices/product-details/productSizeSelectorSlice";
import productQuantityReducer from "@/store/slices/product-details/productQuantitySlice";
import productReviewReducer from "@/store/slices/product-details/productReviewSlice";
import cartReducer from "@/store/slices/cart/cartSlices";
import productViewReducer from "@/store/slices/product-view/productViewSlice";
import checkoutReducer from "@/store/slices/checkout/checkoutSlice";
import orderFilterReducer from "@/store/slices/dashboard/orderFilterSlice";
import reviewFilterReducer from "@/store/slices/dashboard/reviewFilterSlice";
import authReducer from "@/store/slices/user/userSlice";
import getShippingAddressReducer from "@/store/slices/dashboard/getShippingAddressSlice";
import getUserPersonalInfoReducer from "@/store/slices/dashboard/getUserPersonalInfoSlice";
import acccountDeletionStatusReducer from "@/store/slices/user/accountDeletionStatusSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "hamburger",
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
    "user",
    "getShippingAddress",
    "getUserPersonalInfo",
    "accountDeletionStatus",
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
  hamburger: hamburgerReducer,
  user: authReducer,
  getShippingAddress: getShippingAddressReducer,
  getUserPersonalInfo: getUserPersonalInfoReducer,
  acccountDeletionStatus: acccountDeletionStatusReducer,
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
