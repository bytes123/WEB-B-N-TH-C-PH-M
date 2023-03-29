import React, { useEffect, useState } from "react";
import {
  defaultPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../static/UserForm";

export default function useSignUp() {
  const [placeHolder, setPlaceHolder] = useState(defaultPlaceHolder);
  const [user, setUser] = useState(defaultUser);
  const [errors, setErrors] = useState({});

  const handleSubmit = (data) => {
    delete user.confirm;
    setUser({
      ...user,
      data,
    });

    if (!user.ward) {
      errors.ward = "Vui lòng chọn phường/xã";
    }

    if (!user.district) {
      errors.district = "Vui lòng chọn quận/huyện";
    }

    if (!user.address) {
      errors.address = "Vui lòng nhập địa chỉ";
    }
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
    console.log(user);
  }, [user]);

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
