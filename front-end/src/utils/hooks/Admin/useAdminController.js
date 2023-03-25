import React, { useState } from "react";
import { Input } from "antd";
export default function useAdminComment({ propData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const dataCheck = ["catalog_name"];

  const [rootData, setRootData] = useState(propData);

  const handleOpenAdd = () => {
    setIsOpen(true);
  };

  const handleCloseAdd = () => {
    setIsOpen(false);
  };

  const handleChangeInput = (e) => {
    setRootData({
      ...rootData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenEdit = (data, index) => {
    setIsEdit(true);

    setRootData({
      row_index: index,
      ...data,
    });
    console.log(data);
  };

  const handleCloseEdit = (data, index) => {
    setIsEdit(false);
  };

  const handleCloseDelete = (data, index) => {
    setIsDelete(false);
  };

  const confirmEdit = () => {
    handleCloseEdit(false);
    setRootData(propData);
  };

  const handleOpenDelete = (data) => {
    setIsDelete(true);
  };

  return [
    rootData,
    isDelete,
    isEdit,
    isOpen,
    handleChangeInput,
    handleOpenEdit,
    handleCloseEdit,
    confirmEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleOpenAdd,
    handleCloseAdd,
  ];
}
