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

import searchReducer from "@/store/slices/search-results/searchSlice";
import hamburgerReducer from "@/store/slices/humburger/hamburgerSlice";
import resetPasswordReducer from "@/store/slices/user/resetPasswordSlice";
import setPasswordReducer from "@/store/slices/user/setPasswordSlice";
import productColorSelectorReducer from "@/store/slices/product-details/productColorSelectorSlice";
import productSizeSelectorReducer from "@/store/slices/product-details/productSizeSelectorSlice";
import productQuantityReducer from "@/store/slices/product-details/productQuantitySlice";
import productSetIdReducer from "@/store/slices/product-details/productSetIdSlice";
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
import supportTabReducer from "@/store/slices/dashboard/supportTab";
import openTicketReducer from "@/store/slices/dashboard/openTicketSlice";
import orderDetailsReducer from "@/store/slices/dashboard/orderDetailsSlice";
import filterUIReducer from "@/store/slices/filterUI.slice";
import tabsReducer from "@/store/slices/tab/tabsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "search",
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
    "productSetId",
  ],
};

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  resetPassword: resetPasswordReducer,
  search: searchReducer,
  setPassword: setPasswordReducer,
  productColorSelector: productColorSelectorReducer,
  productSizeSelector: productSizeSelectorReducer,
  productQuantity: productQuantityReducer,
  productId: productSetIdReducer,
  productReview: productReviewReducer,
  cartR: cartReducer,
  productView: productViewReducer,
  checkout: checkoutReducer,
  orderFilter: orderFilterReducer,
  reviewFilter: reviewFilterReducer,
  hamburger: hamburgerReducer,
  user: authReducer,
  orderDetails: orderDetailsReducer,
  getShippingAddress: getShippingAddressReducer,
  getUserPersonalInfo: getUserPersonalInfoReducer,
  acccountDeletionStatus: acccountDeletionStatusReducer,
  supportTab: supportTabReducer,
  openTicket: openTicketReducer,
  filterUI: filterUIReducer,
  tabs: tabsReducer,
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
