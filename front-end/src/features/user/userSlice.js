import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  LOGIN_URL,
  USERS_URL,
  DELETE_USER_URL,
  ADMIN_TYPE_USER_URL,
  UPDATE_STAFF_URL,
  SEARCH_USER_URL,
  LOGIN_FB_URL,
  LOCK_USER_URL,
  UPDATE_CUSTOMER_URL,
  USER_URL,
} from "../../static/API";
import { handleLogIn } from "../../utils/hooks/useAccessUser";

const initialState = {
  message: "", // '' | 'Xác thực mail thành công' | 'Mã token không hợp lệ'
  status: "loading", // 'loading' | 'succeeded' | 'failed',
  error: "",
  login_status: "",
  user: {},
  users: [],
  errors: {},
  get_users_status: "loading",
  admin_type_user: [],
  delete_status: "",
  update_status: "",
  search_status: "",
  fetch_search_status: "",
  search_users: [],
  lock_status: "",
};

export const loginFB = createAsyncThunk("user/fb-login", async (data) => {
  console.log(data);
  const response = await axios.post(LOGIN_FB_URL, data);

  return response.data;
});

export const loginRequest = createAsyncThunk("user/login", async (user) => {
  const response = await axios.post(LOGIN_URL, user);

  return response.data;
});

export const fetchUser = createAsyncThunk("user/get-user", async (user) => {
  const response = await axios.post(USER_URL, user);

  return response.data;
});

export const updateStaff = createAsyncThunk(
  "user/update-staff",
  async (data) => {
    const formData = new FormData();
    if (data?.avatar) {
      formData.append("avatar", data.avatar);
      delete data.avatar;
    }

    formData.append("data", JSON.stringify(data));
    const response = await axios({
      method: "post",
      url: UPDATE_STAFF_URL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "user/update-customer",
  async (data) => {
    const formData = new FormData();
    if (data?.avatar) {
      formData.append("avatar", data.avatar);
      delete data.avatar;
    }

    formData.append("data", JSON.stringify(data));
    const response = await axios({
      method: "post",
      url: UPDATE_CUSTOMER_URL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const LockAccount = createAsyncThunk(
  "user/lock_account",
  async (data) => {
    const response = await axios.post(LOCK_USER_URL, data);

    return response.data;
  }
);

export const fetchAdminTypeUser = createAsyncThunk(
  "user/admin_type_user",
  async (data) => {
    const response = await axios.get(ADMIN_TYPE_USER_URL, data);

    return response.data;
  }
);

export const deleteUser = createAsyncThunk("user/delete", async (data) => {
  const response = await axios.post(DELETE_USER_URL, data);

  return response.data;
});

export const fetchAllUser = createAsyncThunk("user/getAll", async (user) => {
  const response = await axios.get(USERS_URL, user);

  return response.data;
});

export const searchUser = createAsyncThunk("user/search", async (value) => {
  const response = await axios.post(SEARCH_USER_URL, {
    value: value,
  });

  return response.data;
});

export const fetchSearchUser = createAsyncThunk(
  "user/fetch_search",
  async (value) => {
    const response = await axios.post(SEARCH_USER_URL, {
      value: value,
    });

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetDeleteStatus(state, action) {
      state.delete_status = "";
    },
    resetUpdateStatus(state, action) {
      state.update_status = "";
    },
    resetErrors(state, status) {
      state.errors = {};
    },
    resetError(state, status) {
      state.error = "";
    },
    resetSearchStatus(state, action) {
      state.search_status = "";
    },
    resetLockStatus(state, action) {
      state.lock_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.error = action.payload;

        if (typeof action.payload === "object") {
          console.log(action.payload);
          handleLogIn(action.payload);
          return state; // Trạng thái không thay đổi
        }
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchUser.pending, (state, action) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {})
      .addCase(fetchAllUser.pending, (state, action) => {
        state.get_users_status = "loading";
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.get_users_status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.get_users_status = "failed";
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.delete_status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.delete_status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.delete_status = "failed";
      })
      .addCase(fetchAdminTypeUser.pending, (state, action) => {})
      .addCase(fetchAdminTypeUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          state.admin_type_user = action.payload;
        }
      })
      .addCase(fetchAdminTypeUser.rejected, (state, action) => {})
      .addCase(updateStaff.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.includes("USER_EXISTS")) {
          state.errors.user_name = "Tài khoản đã tồn tại";
          state.update_status = "failed";
        }

        if (action.payload.includes("EMAIL_EXISTS")) {
          state.errors.email = "Email đã tồn tại";
          state.update_status = "failed";
        }
        if (action.payload == "SUCCESS_UPDATE") {
          state.update_status = "succeeded";
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.update_status = "failed";
      })
      .addCase(updateCustomer.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.includes("USER_EXISTS")) {
          state.errors.user_name = "Tài khoản đã tồn tại";
          state.update_status = "failed";
        }

        if (action.payload.includes("EMAIL_EXISTS")) {
          state.errors.email = "Email đã tồn tại";
          state.update_status = "failed";
        }
        if (action.payload == "SUCCESS_UPDATE") {
          state.update_status = "succeeded";
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.update_status = "failed";
      })
      .addCase(searchUser.pending, (state, action) => {
        state.search_status = "loading";
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.search_status = "succeeded";
        state.search_users = action.payload;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.search_status = "failed";
      })
      .addCase(fetchSearchUser.pending, (state, action) => {
        state.fetch_search_status = "loading";
      })
      .addCase(fetchSearchUser.fulfilled, (state, action) => {
        state.fetch_search_status = "succeeded";
        state.search_users = action.payload;
      })
      .addCase(fetchSearchUser.rejected, (state, action) => {
        state.fetch_search_status = "failed";
      })
      .addCase(LockAccount.pending, (state, action) => {
        state.lock_status = "loading";
      })
      .addCase(LockAccount.fulfilled, (state, action) => {
        state.lock_status = action.payload;
      })
      .addCase(LockAccount.rejected, (state, action) => {
        state.lock_status = "failed";
      });
  },
});

export const getUser = (state) => state.user.user;
export const getAllUser = (state) => state.user.users;
export const getAllUserStatus = (state) => state.user.get_users_status;
export const getMessage = (state) => state.user.message;
export const getStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;
export const getErrors = (state) => state.user.errors;
export const getLoginStatus = (state) => state.user.login_status;
export const getDeleteStatus = (state) => state.user.delete_status;
export const getUpdateStatus = (state) => state.user.update_status;
export const getAdminType = (state) => state.user.admin_type_user;
export const getSearchStatus = (state) => state.user.search_status;
export const getFetchSearchStatus = (state) => state.user.fetch_search_status;
export const getSearchUsers = (state) => state.user.search_users;
export const getLockStatus = (state) => state.user.lock_status;
export const {
  resetDeleteStatus,
  resetErrors,
  resetUpdateStatus,
  handleSearchUsers,
  resetSearchStatus,
  resetError,
  resetLockStatus,
} = userSlice.actions;

export default userSlice.reducer;
