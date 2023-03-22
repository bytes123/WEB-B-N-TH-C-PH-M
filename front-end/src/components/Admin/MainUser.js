import React from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import {
  userTemplateData,
  userListData,
  userDataCheck,
} from "../../static/AdminData";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import { Input } from "antd";
import { FaExchangeAlt } from "react-icons/fa";
import { Table } from "antd";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

export default function MainUser() {
  const [
    rootData,
    isDelete,
    isEdit,
    handleChangeInput,
    handleOpenEdit,
    handleCloseEdit,
    confirmEdit,
    handleOpenDelete,
    handleCloseDelete,
  ] = useAdminController(userTemplateData);

  const userData = React.useMemo(() => userListData);

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: pink[600],
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600],
    },
  }));

  const columns = [
    {
      title: "STT",
      key: "row_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "user_image",
      key: "user_image",
      render: (data, arr, index) =>
        !isEdit ? (
          <>
            <img className="w-[80px]" src={data} alt="" />
          </>
        ) : rootData.row_index == index ? (
          <div className="relative w-[80px] ">
            <div className="change-icon absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
              <FaExchangeAlt className="text-4xl" />
            </div>

            <input
              type="file"
              name="file"
              className="opacity-0 absolute left-0 right-0 top-0 bottom-0 z-10 cursor-pointer"
            />

            <img className="opacity-50" src={rootData.user_image} alt="" />
          </div>
        ) : (
          <img className="w-[80px]" src={data} alt="" />
        ),
    },
    {
      title: "Tên chủ tài khoản",
      dataIndex: "user_fullname",
      key: "user_fullname",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.user_fullname ? rootData.user_fullname : data}
            name="user_fullname"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Tài khoản",
      dataIndex: "user_name",
      key: "user_name",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.user_name ? rootData.user_name : data}
            name="user_name"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Mật khẩu",
      dataIndex: "user_password",
      key: "user_password",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.user_password ? rootData.user_password : data}
            name="user_password"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "user_address",
      key: "user_address",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.user_address ? rootData.user_address : data}
            name="user_address"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Quyền Admin",
      dataIndex: "user_isAdmin",
      key: "user_isAdmin",
      render: (data, arr, index) => (
        <GreenSwitch label="Admin" defaultChecked={data.user_isAdmin} />
      ),
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "user_created_date",
      key: "user_created_date",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={
              rootData.user_created_date ? rootData.user_created_date : data
            }
            name="user_created_date"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },

    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (data, arr, index) => (
        <div className="flex">
          {!isEdit ? (
            <>
              <button
                className="edit-btn mr-5"
                name="edit-btn"
                onClick={() => handleOpenEdit(arr, index)}
              >
                Sửa
              </button>
              <button
                className="delete-btn"
                onClick={() => handleOpenDelete(arr)}
              >
                Xóa
              </button>
            </>
          ) : index == rootData.row_index ? (
            <div className="flex">
              <button className="confirm-btn mr-5" onClick={confirmEdit}>
                Hoàn tất
              </button>
              <button className="cancel-btn" onClick={handleCloseEdit}>
                Hủy bỏ
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="main_user mx-2">
      {isDelete ? (
        <ConfirmDialog
          active={true}
          onClose={handleCloseDelete}
          header={"Bạn có chắc muốn xóa cột này ?"}
          content={"Bạn sẽ không thể phục hồi sau khi xóa cột!"}
        />
      ) : (
        ""
      )}
      <h1 className="text-4xl font-bold m-5">Quản lý tài khoản</h1>
      <Section span={24}>
        <div className="wrapper p-8 ">
          <h3 className="text-2xl font-bold">Thêm tài khoản</h3>
          <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách tài khoản
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={userDataCheck} />
          </div>
        </div>
      </Section>
      <Section span={24}>
        <div className="wrapper p-8">
          <h3 className="text-2xl font-bold mb-5">Danh sách tài khoản</h3>
          <div className="table-wrapper">
            <Table
              bordered={true}
              columns={columns}
              dataSource={userData}
              className="text-sm"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
