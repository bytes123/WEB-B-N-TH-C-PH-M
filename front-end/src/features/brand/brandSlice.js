import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BRAND_URL,
  ADD_BRAND_URL,
  UPDATE_BRAND_URL,
  DELETE_BRAND_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  brands: [],
  errors: {},
  add_status: "",
  update_status: "",
  delete_status: "",
};

export const fetchBrands = createAsyncThunk("brand/get_brand", async () => {
  const response = await axios.get(BRAND_URL);
  return response.data;
});

export const addBrand = createAsyncThunk("brand/add", async (data) => {
  const response = await axios.post(ADD_BRAND_URL, data);

  return response.data;
});

export const updateBrand = createAsyncThunk("brand/update", async (data) => {
  const response = await axios.post(UPDATE_BRAND_URL, data);

  return response.data;
});

export const deleteBrand = createAsyncThunk("brand/delete", async (data) => {
  const response = await axios.post(DELETE_BRAND_URL, data);

  return response.data;
});

const brandSlice = createSlice({
  name: "brand",
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
      .addCase(fetchBrands.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(addBrand.pending, (state, action) => {
        state.add_status = "loading";
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        if (action.payload == "CATEGORY_EXISTS") {
          state.errors.name = "Tên danh mục đã tồn tại";
          state.add_status = "failed";
        }

        if (action.payload == "ADD_SUCCESS") {
          state.add_status = "succeeded";
        }
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.add_status = "failed";
        console.log(action.error);
      })
      .addCase(updateBrand.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        if (action.payload == "CATEGORY_EXISTS") {
          state.errors.name = "Tên danh mục đã tồn tại";
          state.update_status = "failed";
        }

        if (action.payload == "UPDATE_SUCCESS") {
          state.update_status = "succeeded";
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.update_status = "failed";
        console.log(action.error);
      })
      .addCase(deleteBrand.pending, (state, action) => {
        state.delete_status = "loading";
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.delete_status = "succeeded";
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.delete_status = "failed";
        console.log(action.error);
      });
  },
});

export const getErrors = (state) => state.brand.errors;
export const getAddStatus = (state) => state.brand.add_status;
export const getUpdateStatus = (state) => state.brand.update_status;
export const getDeleteStatus = (state) => state.brand.delete_status;
export const getBrands = (state) => state.brand.brands;

export const {
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetAllErrors,
  resetError,
} = brandSlice.actions;
export default brandSlice.reducer;
