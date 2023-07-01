import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  REVENUE_DURATION_URL,
  REVENUE_MONTH_URL,
  TOP_PRODUCTS_BY_YEAR_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  revenueByDuration: [],
  revenueByMonth: [],
  topProductsByYear: [],
  errors: {},
  fetch_status: "",
};

export const fetchRevenueByDuration = createAsyncThunk(
  "statistic/revenueByDuation",
  async (year) => {
    const response = await axios.post(REVENUE_DURATION_URL, {
      year: year,
    });
    return response.data;
  }
);

export const fetchRevenueByMonth = createAsyncThunk(
  "statistic/revenueBymonth",
  async (year) => {
    const response = await axios.post(REVENUE_MONTH_URL, {
      year: year,
    });
    return response.data;
  }
);

export const fetchTopProductsByYear = createAsyncThunk(
  "statistic/topProductByYear",
  async (year) => {
    const response = await axios.post(TOP_PRODUCTS_BY_YEAR_URL, {
      year: year,
    });
    return response.data;
  }
);

const statisticSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    resetFetchStatus(state, action) {
      state.fetch_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRevenueByDuration.pending, (state, action) => {
        state.fetch_status = "loading";
      })
      .addCase(fetchRevenueByDuration.fulfilled, (state, action) => {
        state.fetch_status = "succeeded";
        state.revenueByDuration = action.payload;
      })
      .addCase(fetchRevenueByDuration.rejected, (state, action) => {
        state.fetch_status = "failed";
        console.log("err");
      })
      .addCase(fetchRevenueByMonth.pending, (state, action) => {
        state.fetch_status = "loading";
      })
      .addCase(fetchRevenueByMonth.fulfilled, (state, action) => {
        state.fetch_status = "succeeded";
        state.revenueByMonth = action.payload;
      })
      .addCase(fetchRevenueByMonth.rejected, (state, action) => {
        state.fetch_status = "failed";
        console.log("err");
      })
      .addCase(fetchTopProductsByYear.pending, (state, action) => {
        state.fetch_status = "loading";
      })
      .addCase(fetchTopProductsByYear.fulfilled, (state, action) => {
        state.fetch_status = "succeeded";
        state.topProductsByYear = action.payload;
      })
      .addCase(fetchTopProductsByYear.rejected, (state, action) => {
        state.fetch_status = "failed";
        console.log("err");
      });
  },
});

export const getRevenueByDuration = (state) =>
  state.statistic.revenueByDuration;
export const getRevenueByMonth = (state) => state.statistic.revenueByMonth;
export const getFetchStatus = (state) => state.statistic.fetch_status;
export const getTopProductsByYear = (state) =>
  state.statistic.topProductsByYear;
export const { resetFetchStatus } = statisticSlice.actions;
export default statisticSlice.reducer;
