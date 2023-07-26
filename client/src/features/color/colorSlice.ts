import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";
import { IColor } from "../../types/features/types";

interface initialStateColor {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: any;
  colors: IColor[];
}
const initialState: initialStateColor = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  colors: [],
};
export const getAllColor = createAsyncThunk(
  "color/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const colors = await colorService.getAllColor();
      return colors;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload.data;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export default colorSlice.reducer;
