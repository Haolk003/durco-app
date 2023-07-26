import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/category/categorySlice";
import authSlice from "../features/auth/authSlice";
import productSlice from "../features/product/productSlice";
import colorSlice from "../features/color/colorSlice";
import brandSlice from "../features/brand/brandSlice";
const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
    product: productSlice,
    color: colorSlice,
    brand: brandSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
