import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_BILL_URL, UPDATE_STATEMENT_BILL_URL } from "../../static/API";
import axios from "axios";

const initialState = {
  bills: [],
  errors: {},
  search_status: "",
  fetch_bill_status: "",
  update_statement: "",
  search_bills: [],
};

export const fetchBill = createAsyncThunk("bill/get", async () => {
  const response = await axios.get(GET_BILL_URL);

  return response.data;
});

export const updateStamentBill = createAsyncThunk(
  "bill/update_statement",
  async (data) => {
    const response = await axios.post(UPDATE_STATEMENT_BILL_URL, data);

    return response.data;
  }
);

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    resetAllErrors(state, action) {
      state.errors = {};
    },
    resetBillStatus(state, action) {
      state.fetch_bill_status = "";
    },
    resetUpdateStatement(state, action) {
      state.update_statement = "";
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchBill.pending, (state, action) => {
        state.fetch_bill_status = "loading";
      })
      .addCase(fetchBill.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fetch_bill_status = "succeeded";
        state.bills = action.payload;
      })
      .addCase(fetchBill.rejected, (state, action) => {
        state.fetch_bill_status = "failed";
      })
      .addCase(updateStamentBill.pending, (state, action) => {

      })
      .addCase(updateStamentBill.fulfilled, (state, action) => {
        console.log(action.payload);
        state.update_statement = action.payload;
      })
      .addCase(updateStamentBill.rejected, (state, action) => {

      });
  },
});

export const getErrors = (state) => state.detail_product.errors;
export const getBills = (state) => state.bill.bills;
export const getUpdateStamentStatus = (state) =>
  state.bill.update_statement_status;

export const { resetError, resetBillStatus, resetUpdateStatement } =
  billSlice.actions;
export default billSlice.reducer;
