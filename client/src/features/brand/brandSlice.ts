import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";
import { MyAxiosError } from "../../types/features/axiosError";
import { IBrand } from "../../types/features/types";
interface initialStateBrand {
  brands: IBrand[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: any;
}
const initialState: initialStateBrand = {
  brands: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const getAllBrand = createAsyncThunk(
  "brand/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await brandService.getAllBrand();
      return data;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data.message);
    }
  }
);
const brandSlice = createSlice({
  name: "brand",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload.data;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export default brandSlice.reducer;
