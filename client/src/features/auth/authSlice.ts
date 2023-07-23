import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MyAxiosError } from "../../types/features/axiosError";
import authService from "./authService";

interface userInfoType {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
interface initialStateType {
  userInfo: userInfoType | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: any;
  isLogin: boolean;
}
const initialState: initialStateType = {
  userInfo: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isLogin: false,
};
type loginTypes = {
  userName: string;
  password: string;
};
type registerTypes = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};
export const login = createAsyncThunk(
  "auth/login",
  async (data: loginTypes, { rejectWithValue }) => {
    try {
      const user = await authService.login(data.userName, data.password);
      return user;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data?.message);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (data: registerTypes, { rejectWithValue }) => {
    try {
      const user = await authService.register(
        data.userName,
        data.password,
        data.email,
        data.firstName,
        data.lastName
      );
      return user;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data?.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await authService.forgotPassword(email);
      return data;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data?.message);
    }
  }
);
interface resetPassword {
  token: string;
  userId: string;
  newPassword: string;
}
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: resetPassword, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(
        data.userId,
        data.token,
        data.newPassword
      );
      return response;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError.response?.data?.message);
    }
  }
);
interface verifyEmailType {
  token: string;
  userId: string;
}
export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async (data: verifyEmailType, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(data.userId, data.token);
      return response;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError?.response?.data?.message);
    }
  }
);
export const getProfileUser = createAsyncThunk(
  "auth/getProfileUser",
  async (_arg: any, { rejectWithValue }) => {
    try {
      const resposne = await authService.getProfileUser();
      return resposne;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError?.response?.data?.message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (_: any, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (err) {
      const axiosError = err as MyAxiosError;
      return rejectWithValue(axiosError?.response?.data?.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isLogin = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload?.data;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isLogin = false;
      });
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(getProfileUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isLogin = false;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLogin = true;
        state.userInfo = action.payload.data;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export default authSlice.reducer;
