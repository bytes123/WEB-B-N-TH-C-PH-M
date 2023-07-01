import React, { useState, useEffect } from "react";
import { Input } from "antd";
export default function useAdminController(
  handleChangeValue = () => {},
  handleSetValue = () => {},
  clearUpdate = () => {},
  clearAdd = () => {}
) {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [userName, setUserName] = useState();
  const [isLocked, setIsLocked] = useState(false);
  const [isUnLocked, setIsUnlocked] = useState(false);

  const handleLockUser = (user_name) => {
    setUserName(user_name);
    setIsLocked(true);
  };

  const handleUnLockUser = (user_name) => {
    setUserName(user_name);
    setIsUnlocked(true);
  };

  const handleCloseLockUser = () => {
    setIsLocked(false);
  };

  const handleCloseUnLockUser = () => {
    setIsUnlocked(false);
  };

  const handleOpenAdd = () => {
    setIsAdd(true);
  };

  const handleCloseAdd = () => {
    setIsAdd(false);
  };

  const handleChangeInput = (e) => {
    handleChangeValue(e);
  };

  const handleOpenEdit = (data) => {
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

  const handleOpenDelete = (data) => {
    setIdDelete(data);
    setIsDelete(true);
  };

  const handleConfirmRate = (arr) => {
    console.log(arr);
  };

  useEffect(() => {
    if (!isEdit) {
      clearUpdate();
    }
  }, [isEdit]);

  useEffect(() => {
    if (!isAdd) {
      clearAdd();
    }
  }, [isAdd]);

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
    handleLockUser,
    handleUnLockUser,
    handleCloseLockUser,
    handleCloseUnLockUser,
    userName,
    isLocked,
    isUnLocked,
  };
}
