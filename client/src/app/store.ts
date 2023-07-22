import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/category/categorySlice";
import authSlice from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    category: categorySlice,
    auth: authSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
