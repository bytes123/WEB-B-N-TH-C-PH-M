import React, { useState, useEffect } from "react";
import { Input } from "antd";
export default function useAdminController(
  handleChangeValue,
  handleSetValue,
  clearErrors = () => {},
  clearValues = () => {}
) {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const dataCheck = ["catalog_name"];

  const handleOpenAdd = () => {
    setIsAdd(true);
  };

  const handleCloseAdd = () => {
    setIsAdd(false);
  };

  const handleChangeInput = (e) => {
    handleChangeValue(e);
  };

  const handleOpenEdit = (data, index) => {
    console.log(data);
    setIsEdit(true);
    handleSetValue(data, index);
  };

  const handleCloseEdit = (data, index) => {
    setIsEdit(false);
  };

  const handleCloseDelete = (data, index) => {
    setIsDelete(false);
  };

  const confirmEdit = () => {
    handleCloseEdit(false);
  };

  const handleOpenDelete = (data) => {
    setIsDelete(true);
  };

  const handleConfirmRate = (arr) => {
    console.log(arr);
  };

  useEffect(() => {
    if (!isEdit && !isAdd) {
      clearErrors();
      clearValues();
    }
  }, [isEdit, isAdd]);

  return {
    isDelete,
    isEdit,
    isAdd,
    handleChangeInput,
    handleOpenEdit,
    handleCloseEdit,
    confirmEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleOpenAdd,
    handleCloseAdd,
    handleConfirmRate,
  };
}
