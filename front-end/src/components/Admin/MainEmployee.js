import React from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import { Table } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import {
  employeeTemplateData,
  employeeListData,
  employeeDataCheck,
} from "../../static/AdminData";
import { Input } from "antd";
import { FaExchangeAlt } from "react-icons/fa";

export default function MainEmployee() {
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
  ] = useAdminController(employeeTemplateData);

  const employeeData = React.useMemo(() => employeeListData);

  const columns = [
    {
      title: "STT",
      key: "employee_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Hình nhân viên",
      dataIndex: "employee_image",
      key: "employee_image",
      render: (data, arr, index) => (
        <img className=" w-[80px]" src={data} alt="" />
      ),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employee_name",
      key: "employee_name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Tuổi nhân viên",
      dataIndex: "employee_age",
      key: "employee_age",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Quê nhân viên",
      dataIndex: "employee_hometown",
      key: "employee_hometown",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Chức vụ nhân viên",
      dataIndex: "employee_position",
      key: "employee_position",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Tiền lương",
      dataIndex: "employee_salary",
      key: "employee_salary",
      render: (data, arr, index) => <p>{data}</p>,
    },

    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (data, arr, index) => (
        <div className="flex">
          <button
            className="edit-btn mr-5"
            name="edit-btn"
            onClick={() => handleOpenEdit(arr, index)}
          >
            Sửa
          </button>
          <button className="delete-btn" onClick={() => handleOpenDelete(arr)}>
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="main_employee mx-2">
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
      <h1 className="text-4xl font-bold m-5">Quản lý nhân viên</h1>
      <Section span={24}>
        <div className="wrapper p-8 ">
          <h3 className="text-2xl font-bold">Thêm nhân viên</h3>
          <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách nhân viên
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={employeeDataCheck} />
          </div>
        </div>
      </Section>
      <Section span={24}>
        <div className="wrapper p-8">
          <h3 className="text-2xl font-bold mb-5">Danh sách nhân viên</h3>
          <div className="table-wrapper">
            <Table
              bordered={true}
              columns={columns}
              dataSource={employeeData}
              className="text-sm"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
