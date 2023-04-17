import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useAccessUser from "../../utils/hooks/useAccessUser";
import { LOGIN_URL, AUTH_URL } from "../../static/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { handleLogIn } from "../../utils/hooks/useAccessUser";

const initialState = {
  message: "", // '' | 'Xác thực mail thành công' | 'Mã token không hợp lệ'
  status: "loading", // 'loading' | 'succeeded' | 'failed',
  error: "",
  login_status: "",
  user: {},
};

export const loginRequest = createAsyncThunk("user/login", async (user) => {
  const response = await axios.post(LOGIN_URL, user);

  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetLoginStatus(state, action) {
      state.login_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        if (action.payload == "FAILED_LOGIN") {
          state.error = action.payload;
          return;
        }

        if (action.payload == "USER_NOT_CONFIRMED") {
          state.error = action.payload;
          return;
        }

        if (typeof action.payload === "object") {
          console.log(action.payload);
          handleLogIn(action.payload);
        }
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const getUser = (state) => state.user.user;
export const getMessage = (state) => state.user.message;
export const getStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;
export const getLoginStatus = (state) => state.user.login_status;

export const { resetLoginStatus } = userSlice.actions;

export default userSlice.reducer;
