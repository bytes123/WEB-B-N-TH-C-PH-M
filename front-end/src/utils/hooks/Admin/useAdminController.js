import React, { useState, useEffect } from "react";
import { Input } from "antd";
export default function useAdminController(
  handleChangeValue,
  handleSetValue,

  clearFetchError
) {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();

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
    handleSetValue(data);
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const handleCloseDelete = () => {
    setIsDelete(false);
  };

  const confirmEdit = () => {
    handleCloseEdit(false);
  };

  const handleOpenDelete = (user_name) => {
    setIdDelete(user_name);
    setIsDelete(true);
  };

  const handleConfirmRate = (arr) => {
    console.log(arr);
  };

  useEffect(() => {
    if (!isEdit) {
      clearFetchError();
    }
  }, [isEdit]);

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
    idDelete,
  };
}
