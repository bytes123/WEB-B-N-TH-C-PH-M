import React, { useEffect, useState } from "react";
import {
  defaultPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../static/UserForm";

export default function useSignUp(callback) {
  const [placeHolder, setPlaceHolder] = useState(defaultPlaceHolder);
  const [user, setUser] = useState(defaultUser);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (data) => {
    setUser({
      ...user,
      ...data,
    });

    if (!user.user_ward) {
      errors.user_ward = "Vui lòng chọn phường/xã";
    }

    if (!user.user_district) {
      errors.user_district = "Vui lòng chọn quận/huyện";
    }

    if (!user.address) {
      errors.address = "Vui lòng nhập địa chỉ";
    }
    setIsSubmit(true);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(defaultPlaceHolder);
  };

  const handleAddress = (name, item) => {
    setUser({
      ...user,
      [name]: item,
    });
    clearErrors();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback(user);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return {
    placeHolder,
    user,
    handleSubmit,
    handleBlurPlaceHolder,
    handleFocusPlaceHolder,
    handleAddress,
    errors,
    clearErrors,
  };
}
