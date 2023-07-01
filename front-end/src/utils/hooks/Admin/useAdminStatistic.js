import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRevenueByDuration,
  fetchRevenueByMonth,
  getRevenueByMonth,
  getRevenueByDuration,
  getFetchStatus,
  getTopProductsByYear,
  fetchTopProductsByYear,
} from "../../../features/statistic/statisticSlice";
import { useLocation } from "react-router-dom";
export default function useAdminCategory() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const monthList = months.slice(0, currentMonth + 1);

  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: currentYear - 2020 }, (_, index) => {
    const year = 2021 + index;
    return { value: year, label: year.toString() };
  }).reverse();

  const [year, setYear] = useState(yearList[0].value);
  const dispatch = useDispatch();
  const fetch_revenueByDuation = useSelector(getRevenueByDuration);
  const fetch_revenueByMonth = useSelector(getRevenueByMonth);
  const fetch_topProductsByYear = useSelector(getTopProductsByYear);
  const status = useSelector(getFetchStatus);
  const [revenueByDuation, setRevenueByDuation] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [topProductsByYear, setTopProductsByYear] = useState([]);

  const onChangeYear = (year) => {
    setYear(year);
  };

  useEffect(() => {
    dispatch(fetchRevenueByDuration(year));
    dispatch(fetchRevenueByMonth(year));
    dispatch(fetchTopProductsByYear(year));
  }, [year]);

  useEffect(() => {
    setRevenueByDuation(fetch_revenueByDuation);
  }, [fetch_revenueByDuation]);

  useEffect(() => {
    setRevenueByMonth(fetch_revenueByMonth);
  }, [fetch_revenueByMonth]);

  useEffect(() => {
    setTopProductsByYear(fetch_topProductsByYear);
  }, [fetch_topProductsByYear]);

  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    onChangeYear,
    yearList,
    revenueByDuation,
    revenueByMonth,
    monthList,
    topProductsByYear,
  };
}
