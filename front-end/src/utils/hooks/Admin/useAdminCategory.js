import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  getCategories,
  getAddStatus,
  getUpdateStatus,
  getDeleteStatus,
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} from "../../../features/category/categorySlice";

export default function useAdminCategory(
  addSuccess,
  updateSuccess,
  deleteSuccess,
  resetToast
) {
  const dispatch = useDispatch();
  const fetchCategories = useSelector(getCategories);
  const add_status = useSelector(getAddStatus);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);
  const [currentSearch, setCurrentSearch] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(1);
    dispatch(fetchCategory()).unwrap();
  }, []);

  useEffect(() => {
    if (!currentSearch && add_status == "succeeded") {
      const reset = async () => {
        await dispatch(fetchCategory()).unwrap();
        addSuccess();
      };
      reset();
    } else {
      console.log("test");
    }

    return () => {
      dispatch(resetAddStatus());
      resetToast();
    };
  }, [add_status]);

  useEffect(() => {
    if (!currentSearch && update_status == "succeeded") {
      const reset = async () => {
        await dispatch(fetchCategory()).unwrap();
        updateSuccess();
      };
      reset();
    } else {
      console.log("test");
    }

    return () => {
      dispatch(resetUpdateStatus());
      resetToast();
    };
  }, [update_status]);

  useEffect(() => {
    if (!currentSearch && delete_status == "succeeded") {
      const reset = async () => {
        await dispatch(fetchCategory()).unwrap();
        deleteSuccess();
      };
      reset();
    } else {
      console.log("test");
    }

    return () => {
      dispatch(resetDeleteStatus());
      resetToast();
    };
  }, [delete_status]);

  useEffect(() => {
    console.log(fetchCategories);
    if (fetchCategories?.length) {
      setCategories(fetchCategories);
    }
  }, [fetchCategories]);

  return {
    categories,
  };
}
