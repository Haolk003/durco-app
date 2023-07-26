import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Iproduct } from "../../types/features/types";
import productService from "./productService";
import { MyAxiosError } from "../../types/features/axiosError";
interface initialStateTypes {
  products: Iproduct[];
  product: Iproduct | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
}
const initialState: initialStateTypes = {
  products: [],
  product: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getAllProduct = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getAllProduct();
      return products;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data?.message || "");
    }
  }
);
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data?.message);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export default productSlice.reducer;
