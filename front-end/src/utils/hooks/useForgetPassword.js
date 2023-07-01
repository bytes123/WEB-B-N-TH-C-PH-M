import React, { useEffect, useState } from "react";
import {
  sendForgotCode,
  getErrors,
  getSendStatus,
  resetErrors,
  authForgotCode,
  getAuthForgotCodeStatus,
  changePassword,
  getChangePasswordStatus,
} from "../../features/authen/authenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
export default function useForgetPassword(form) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const send_status = useSelector(getSendStatus);
  const auth_code_status = useSelector(getAuthForgotCodeStatus);
  const change_password_status = useSelector(getChangePasswordStatus);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });

  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  const handleSendMail = (data) => {
    console.log(data);
    setEmail(data.email);
    dispatch(sendForgotCode(data));
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleAuthCode = (data) => {
    data.email = email;
    dispatch(authForgotCode(data));
  };

  const handleChangePassword = (data) => {
    data.email = email;
    dispatch(changePassword(data));
  };

  const handleChangeInput = () => {
    dispatch(resetErrors());
  };
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (send_status == "loading") {
      setIsLoading(true);
    } else if (send_status == "succeeded") {
      setTimeout(() => {
        setIsToast({
          style: "success",
          value: true,
          body: "Gửi mã khôi phục tới mail thành công",
        });
        setIsLoading(false);
        setReset(!reset);
        setStep(2);
      }, 2000);
    } else if (send_status == "failed") {
      setIsToast({
        style: "failed",
        value: true,
        body: "Gửi mã khôi phục tới mail thất bại",
      });
      setReset(!reset);
      setIsLoading(false);
    }
  }, [send_status]);

  useEffect(() => {
    return () =>
      setIsToast({
        style: "",
        value: false,
        body: "",
      });
  }, [reset]);

  useEffect(() => {
    if (auth_code_status == "succeeded") {
      setStep(3);
    }
  }, [auth_code_status]);

  useEffect(() => {
    if (change_password_status == "loading") {
      setIsLoading(true);
    } else if (change_password_status == "succeeded") {
      setTimeout(() => {
        setStep(4);
        setIsToast({
          style: "success",
          value: true,
          body: "Thay đổi mật khẩu thành công",
        });
        setReset(!reset);
        setIsLoading(false);
      }, 2000);
    } else if (change_password_status == "failed") {
      setIsToast({
        style: "failed",
        value: true,
        body: "Thay đổi mật khẩu thất bại",
      });
      setReset(!reset);
      setIsLoading(false);
    }
  }, [change_password_status]);

  useEffect(() => {
    return () => {
      form.resetFields();
      dispatch(resetErrors());
    };
  }, [step]);

  useEffect(() => {
    setStep(1);
    resetToast();
    dispatch(resetErrors());
  }, [location.pathname]);

  let error = useSelector(getErrors);

  return {
    step,
    handleSendMail,
    error,
    handleChangeInput,
    handleAuthCode,
    handleBack,
    handleChangePassword,
    isLoading,
    isToast,
  };
}
