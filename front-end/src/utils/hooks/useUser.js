import React, { useState, useEffect } from "react";
import { fetchUser, getUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateStatus } from "../../features/user/userSlice";

export default function useUser(loginedUser) {
  const dispatch = useDispatch();
  const update_status = useSelector(getUpdateStatus);
  const fetch_user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const clearToast = () => {
    setIsToast({
      value: false,
      body: "",
    });
  };

  const successUpdate = () => {
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật tài khoản thành công",
    });
  };

  useEffect(() => {
    if (update_status == "loading") {
      setIsLoading(true);
    } else if (update_status == "succeeded") {
      const updateEdit = async () => {
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
    dispatch(fetchUser(loginedUser));
  }, []);

  useEffect(() => {
    if (fetch_user) {
      setUser(fetch_user);
      console.log(fetch_user);
    }
  }, [fetch_user]);

  return {
    isLoading,
    isToast,
    user,
  };
}
