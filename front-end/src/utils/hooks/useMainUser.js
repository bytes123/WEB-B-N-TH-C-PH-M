import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  resetSearchStatus,
  fetchAllUser,
  getFetchSearchStatus,
  getSearchStatus,
  getSearchUsers,
  getAllUser,
  getUpdateStatus,
  resetDeleteStatus,
  getDeleteStatus,
  fetchSearchUser,
  getSignUpStatus,
  LockAccount,
  getLockStatus,
  resetLockStatus,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function useMainUser(
  handleCloseDelete,
  handleCloseEdit,
  activeSortIndex,
  activeDisplayIndex,
  handleCloseLockUser,
  handleCloseUnLockUser
) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [currentSearch, setCurrentSearch] = useState();
  const search_status = useSelector(getSearchStatus);
  const search_users = useSelector(getSearchUsers);
  const fetch_search_status = useSelector(getFetchSearchStatus);
  const fetchUsers = useSelector(getAllUser);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const [error, setError] = useState({});
  const successDelete = () => {
    handleCloseDelete();
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa tài khoản thành công",
    });
  };

  const lock_status = useSelector(getLockStatus);

  const handleConfirmLock = async (user_name, isLocked) => {
    dispatch(
      LockAccount({
        user_name: user_name,
        isLocked: isLocked,
      })
    );
  };

  useEffect(() => {
    if (lock_status == "loading") {
      setIsLoading(true);
    } else if (lock_status == "LOCK_SUCCESS") {
      setTimeout(() => {
        dispatch(fetchAllUser());
        setIsLoading(false);
        setIsToast({
          style: "success",
          value: true,
          body: "Khóa tài khoản thành công",
        });
        handleCloseLockUser();
      }, 2000);
    } else if (lock_status == "UNLOCK_SUCCESS") {
      setTimeout(() => {
        dispatch(fetchAllUser());
        setIsLoading(false);
        setIsToast({
          style: "success",
          value: true,
          body: "Mở khóa tài khoản thành công",
        });
        handleCloseUnLockUser();
      }, 2000);
    } else if (lock_status == "failed") {
      setIsLoading(false);
    }

    return () => {
      dispatch(resetLockStatus());
      clearToast();
    };
  }, [lock_status]);

  const successUpdate = () => {
    handleCloseEdit();
    setError({});

    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật tài khoản thành công",
    });
  };

  const clearToast = () => {
    setIsToast({
      value: false,
      body: "",
    });
  };

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllUsers(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    console.log(activeSortIndex, activeDisplayIndex);
  }, [activeSortIndex, activeDisplayIndex]);

  useEffect(() => {
    if (delete_status == "loading") {
      setIsLoading(true);
    } else if (delete_status == "succeeded") {
      const updateDelete = async () => {
        if (currentSearch) {
          await dispatch(fetchSearchUser(currentSearch)).unwrap();
        } else {
          await dispatch(fetchAllUser()).unwrap();
        }
        successDelete();
        setIsLoading(false);
      };
      setTimeout(() => {
        updateDelete();
      }, 2000);
    } else if (delete_status == "failed") {
      setIsLoading(false);
    }

    return () => {
      clearToast();
      dispatch(resetDeleteStatus());
    };
  }, [delete_status]);

  useEffect(() => {
    dispatch(fetchAllUser()).unwrap();
  }, []);

  useEffect(() => {
    if (update_status == "loading") {
      setIsLoading(true);
    } else if (update_status == "succeeded") {
      console.log(currentSearch);
      const updateEdit = async () => {
        if (currentSearch) {
          console.log("Có ");
          await dispatch(fetchSearchUser(currentSearch));
        } else {
          await dispatch(fetchAllUser()).unwrap();
        }
        successUpdate();
        setIsLoading(false);
      };
      setTimeout(() => {
        updateEdit();
      }, 2000);
    } else if (update_status == "failed") {
      setIsLoading(false);
    }

    return () => clearToast();
  }, [update_status]);

  useEffect(() => {
    setUsers(search_users);
  }, [fetch_search_status]);

  const fetchData = async () => {
    if (fetchUsers) {
      setUsers(fetchUsers);
    }
  };

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setUsers(search_users);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    }
  }, [search_status]);

  useEffect(() => {
    fetchData();
  }, [fetchUsers]);

  const handleSearch = (value, callback) => {
    if (value !== "") {
      setCurrentSearch(value);
    }
    callback();
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllUsers(true);
    setTimeout(async () => {
      await dispatch(fetchAllUser()).unwrap();
      setIsLoadingAllUsers(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return {
    users,
    setUsers,
    isLoadingSearch,
    isSearch,
    handleSearch,
    handleOutSearch,
    isLoadingAllUsers,
    currentSearch,
    isToast,
    setIsToast,
    isLoading,
    error,
    setError,
    setIsLoading,
    handleConfirmLock,
  };
}
