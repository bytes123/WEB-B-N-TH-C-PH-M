import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBill,
  getBills,
  updateStamentBill,
  resetUpdateStatement,
} from "../../../features/bill/billSlice";
import { useLocation } from "react-router-dom";
export default function useAdminBill() {
  const fetch_bills = useSelector(getBills);
  const update_statement_status = useSelector(resetUpdateStatement);
  const [bills, setBills] = useState([]);
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBill()).unwrap();
  }, []);

  const onFetchBill = async () => await dispatch(fetchBill()).unwrap();

  useEffect(() => {
    if (fetch_bills.length) {
      setBills(fetch_bills);
    }
  }, [fetch_bills]);

  const handleUpdateStatement = async (data) => {
    await dispatch(updateStamentBill(data)).unwrap();
    setIsToast({
      style: "success",
      value: true,
      body: "Duyệt đơn hàng thành công",
    });
  };
  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  useEffect(() => {
    if (update_statement_status != "") {
      setIsLoading(true);

      setTimeout(() => {
        onFetchBill();
        setIsLoading(false);
      }, 2000);
    }

    return () => {
      dispatch(resetUpdateStatement());
      resetToast();
    };
  }, [update_statement_status]);

  return {
    bills,
    handleUpdateStatement,
    isToast,
    isLoading,
  };
}
