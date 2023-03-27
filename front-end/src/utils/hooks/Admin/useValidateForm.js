import React, { useEffect, useState } from "react";

export default function useCondition(inputData, callback, validate) {
  const [values, setValues] = useState(inputData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeValue = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    if (e.target.type == "file") {
      setValues({
        ...values,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSetValue = (data, index) => {
    setValues({
      row_index: index,
      ...data,
    });
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearValues = () => {
    setValues(inputData);
  };

  const submit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    console.log(values);
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return {
    values,
    handleChangeValue,
    submit,
    errors,
    clearErrors,
    clearValues,
    handleSetValue,
  };
}
