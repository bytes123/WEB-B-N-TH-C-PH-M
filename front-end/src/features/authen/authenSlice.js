import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SIGNUP_URL,
  AUTH_URL,
  SIGNUP_STAFF_URL,
  UPDATE_ONLINE_URL,
  FORGET_PASSWORD_URL,
  AUTH_FORGOT_CODE_URL,
  CHANGE_PASSWORD_URL,
} from "../../static/API";
import { useNavigate } from "react-router-dom";

const initialState = {
  message: "", // '' | 'Xác thực mail thành công' | 'Mã token không hợp lệ'
  status: "loading", // 'loading' | 'succeeded' | 'failed',
  errors: {
    user_name: "",
    email: "",
    forgot_code: "",
  },
  signup_status: "none",
  send_status: "",
  auth_forgot_code_status: "",
  change_password_status: "",
};

export const updateOnline = createAsyncThunk(
  "auth/updateonline",
  async (data) => {
    const response = await axios.post(UPDATE_ONLINE_URL, data);
    return response.data;
  }
);

export const fetchAuthSignup = createAsyncThunk(
  "auth/authtokensignup",
  async (auth_token) => {
    const response = await axios.post(AUTH_URL, {
      auth_token: auth_token,
    });
    return response.data;
  }
);

export const signUpRequest = createAsyncThunk("auth/signup", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  delete data.avatar;
  formData.append("data", JSON.stringify(data));
  const response = await axios({
    method: "post",
    url: SIGNUP_URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
});

export const addStaff = createAsyncThunk("auth/addstaff", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  delete data.avatar;
  formData.append("data", JSON.stringify(data));
  const response = await axios({
    method: "post",
    url: SIGNUP_STAFF_URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
});

export const sendForgotCode = createAsyncThunk(
  "auth/forget-password",
  async (data) => {
    const response = await axios.post(FORGET_PASSWORD_URL, data);
    return response.data;
  }
);

export const authForgotCode = createAsyncThunk(
  "auth/auth-forgot-code",
  async (data) => {
    const response = await axios.post(AUTH_FORGOT_CODE_URL, data);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "auth/change-password",
  async (data) => {
    const response = await axios.post(CHANGE_PASSWORD_URL, data);
    return response.data;
  }
);

const authenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignUpStatus(state, action) {
      state.signup_status = "";
    },
    resetSendStatus(state, action) {
      state.send_status = "";
    },
    resetErrors(state, action) {
      state.errors = {
        user_name: "",
        email: "",
        code: "",
      };
    },
    resetForgotCodeStatus(state, action) {
      state.forgot_code_status = "";
    },
    resetChangePasswordStatus(state, action) {
      state.change_password_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthSignup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAuthSignup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "Xác thực mail thành công";
        console.log(action.payload);
      })
      .addCase(fetchAuthSignup.rejected, (state, action) => {
        state.status = "failed";
        state.message = "Mã token không hợp lệ";
      })
      .addCase(signUpRequest.pending, (state, action) => {
        state.signup_status = "loading";
      })
      .addCase(signUpRequest.fulfilled, (state, action) => {
        state.errors.user_name = "";
        state.errors.email = "";
        if (action.payload.includes("USER_EXISTS")) {
          state.errors.user_name = "Tài khoản đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("EMAIL_EXISTS")) {
          state.errors.email = "Email đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("SIGNUP_SUCCESS")) {
          state.errors.user_name = "";
          state.errors.email = "";
          alert("Vui lòng xác nhận mail để tiếp tục đăng nhập");
          state.signup_status = "succeeded";
        }

        // if (action.payload == "USER_EXISTS") {
        //   state.errors.user_name = "Tài khoản đã tồn tại";
        //   state.signup_status = "failed";
        // } else if(action.payload == "SIGNUP_SUCCESS") {
        //   state.errors.user_name = "";
        //   state.signup_status = "succeeded";
        // }
      })
      .addCase(signUpRequest.rejected, (state, action) => {
        state.signup_status = "failed";
      })
      .addCase(addStaff.pending, (state, action) => {
        state.signup_status = "loading";
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.errors.user_name = "";
        state.errors.email = "";
        console.log(action.payload);
        if (action.payload.includes("USER_EXISTS")) {
          state.errors.user_name = "Tài khoản đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("EMAIL_EXISTS")) {
          state.errors.email = "Email đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("SIGNUP_SUCCESS")) {
          state.errors.user_name = "";
          state.errors.email = "";
          state.signup_status = "succeeded";
        }
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.signup_status = "failed";
      })
      .addCase(updateOnline.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateOnline.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(sendForgotCode.pending, (state, action) => {
        state.errors.email = "";
        state.send_status = "loading";
      })
      .addCase(sendForgotCode.fulfilled, (state, action) => {
        if (action.payload == "EMAIL_NOT_EXISTS") {
          state.errors.email = "Email không tồn tại";
          state.send_status = "failed";
        } else {
          state.send_status = "succeeded";
        }
      })
      .addCase(sendForgotCode.rejected, (state, action) => {
        state.send_status = "failed";
      })
      .addCase(authForgotCode.pending, (state, action) => {
        state.errors.forgot_code = "";
        state.auth_forgot_code_status = "loading";
      })
      .addCase(authForgotCode.fulfilled, (state, action) => {
        if (action.payload == "WRONG_CODE") {
          state.errors.forgot_code = "Mã khôi phục không chính xác";
          state.auth_forgot_code_status = "failed";
        } else {
          state.auth_forgot_code_status = "succeeded";
        }
      })
      .addCase(authForgotCode.rejected, (state, action) => {
        state.auth_forgot_code_status = "failed";
      })
      .addCase(changePassword.pending, (state, action) => {
        state.change_password_status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.change_password_status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.change_password_status = "failed";
      });
  },
});

export const getMessage = (state) => state.auth.message;
export const getStatus = (state) => state.auth.status;
export const getErrors = (state) => state.auth.errors;
export const getSignUpStatus = (state) => state.auth.signup_status;
export const getSendStatus = (state) => state.auth.send_status;
export const getAuthForgotCodeStatus = (state) =>
  state.auth.auth_forgot_code_status;

export const getChangePasswordStatus = (state) =>
  state.auth.change_password_status;

export const {
  resetSignUpStatus,
  resetSendStatus,
  resetErrors,
  resetChangePasswordStatus,
} = authenSlice.actions;

export default authenSlice.reducer;
