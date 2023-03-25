import React, { useEffect, useState } from "react";

export default function useCondition(inputData, callback, validate) {
  const [values, setValues] = useState(inputData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeValues = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return { values, handleChangeValues, submit, errors };
}
