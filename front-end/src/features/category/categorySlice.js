import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CATEGORY_URL,
  ADD_CATEGORY_URL,
  UPDATE_CATEGORY_URL,
  DELETE_CATEGORY_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  categories: [],
  errors: {},
  add_status: "",
  update_status: "",
  delete_status: "",
};

export const fetchCategory = createAsyncThunk(
  "category/messageListAll",
  async () => {
    const response = await axios.get(CATEGORY_URL);
    return response.data;
  }
);

export const addCategory = createAsyncThunk("category/add", async (data) => {
  const response = await axios.post(ADD_CATEGORY_URL, data);

  return response.data;
});

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data) => {
    const response = await axios.post(UPDATE_CATEGORY_URL, data);

    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (data) => {
    const response = await axios.post(DELETE_CATEGORY_URL, data);

    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetAddStatus(state, action) {
      state.add_status = "";
    },
    resetUpdateStatus(state, action) {
      state.update_status = "";
    },
    resetDeleteStatus(state, action) {
      state.delete_status = "";
    },
    resetAllErrors(state, action) {
      state.errors = {};
    },
    resetError(state, action) {
      delete state.errors[action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(addCategory.pending, (state, action) => {
        state.add_status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if (action.payload == "CATEGORY_EXISTS") {
          state.errors.name = "Tên danh mục đã tồn tại";
          state.add_status = "failed";
        }

        if (action.payload == "ADD_SUCCESS") {
          state.add_status = "succeeded";
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.add_status = "failed";
        console.log(action.error);
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload == "CATEGORY_EXISTS") {
          state.errors.name = "Tên danh mục đã tồn tại";
          state.update_status = "failed";
        }

        if (action.payload == "UPDATE_SUCCESS") {
          state.update_status = "succeeded";
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.update_status = "failed";
        console.log(action.error);
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.delete_status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.delete_status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.delete_status = "failed";
        console.log(action.error);
      });
  },
});

export const getErrors = (state) => state.category.errors;
export const getAddStatus = (state) => state.category.add_status;
export const getUpdateStatus = (state) => state.category.update_status;
export const getDeleteStatus = (state) => state.category.delete_status;
export const getCategories = (state) => state.category.categories;
export const {
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetAllErrors,
  resetError,
} = categorySlice.actions;
export default categorySlice.reducer;