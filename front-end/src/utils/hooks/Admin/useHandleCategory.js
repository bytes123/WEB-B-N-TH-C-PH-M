import React, { useEffect, useState } from "react";
import { categoryPlaceHolder } from "../../../static/UserForm";
import { Form } from "antd";
import { getErrors } from "../../../features/category/categorySlice";
import { useSelector } from "react-redux";
export default function useHandleCategory(callback) {
  const [form] = Form.useForm();
  const [placeHolder, setPlaceHolder] = useState(categoryPlaceHolder);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [newValues, setNewValues] = useState({});
  let newrules = useSelector(getErrors);
  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  useEffect(() => {
    setErrors(newrules);
  }, [newrules]);

  const handleSubmit = (data) => {
    setNewValues({
      ...newValues,
      ...data,
    });
    setIsSubmit(true);
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(categoryPlaceHolder);
  };

  useEffect(() => {
    if (Object.keys(newValues).length > 0) {
      setIsChange(true);
    }
  }, [newValues]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback(newValues);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return {
    form,
    handleFocusPlaceHolder,
    handleSubmit,
    newValues,
    setNewValues,
    handleBlurPlaceHolder,
    placeHolder,
    isChange,
    errors,
    setErrors,
  };
}
