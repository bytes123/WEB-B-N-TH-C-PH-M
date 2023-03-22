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
      render: (data, arr, index) =>
        !isEdit ? (
          <img className="w-[80px]" src={data} />
        ) : index == rootData.row_index ? (
          <div className="relative w-[80px] ">
            <div className="change-icon absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
              <FaExchangeAlt className="text-4xl" />
            </div>

            <input
              type="file"
              name="file"
              className="opacity-0 absolute left-0 right-0 top-0 bottom-0 z-10 cursor-pointer"
            />

            <img className="opacity-50" src={rootData.employee_image} alt="" />
          </div>
        ) : (
          <img className=" w-[80px]" src={data} alt="" />
        ),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employee_name",
      key: "employee_name",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.employee_name ? rootData.employee_name : data}
            name="employee_name"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Tuổi nhân viên",
      dataIndex: "employee_age",
      key: "employee_age",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.employee_age ? rootData.employee_age : data}
            name="employee_age"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Quê nhân viên",
      dataIndex: "employee_hometown",
      key: "employee_hometown",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={
              rootData.employee_hometown ? rootData.employee_hometown : data
            }
            name="employee_hometown"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Chức vụ nhân viên",
      dataIndex: "employee_position",
      key: "employee_position",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={
              rootData.employee_position ? rootData.employee_position : data
            }
            name="employee_position"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Tiền lương",
      dataIndex: "employee_salary",
      key: "employee_salary",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.employee_salary ? rootData.employee_salary : data}
            name="employee_salary"
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
