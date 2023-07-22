import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import categoryService from "./categoryService";

interface MyAxiosError<T = any> extends AxiosError<T> {}
interface categoryType {
  name: string;
  _id: string;
}
interface initialStateType {
  categories: categoryType[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}
const initialState: initialStateType = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const getAllCategory = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await categoryService.getAllCategory();
      return categories;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError?.response?.data?.message);
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload.data;
    });
    builder.addCase(
      getAllCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }
    );
  },
});
export default categorySlice.reducer;
