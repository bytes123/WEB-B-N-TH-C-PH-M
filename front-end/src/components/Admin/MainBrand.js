import React from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import { Table } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import {
  brandListData,
  brandTemplateData,
  brandDataCheck,
} from "../../static/AdminData";
import { Input } from "antd";
import { FaExchangeAlt } from "react-icons/fa";

import AU from "../Admin/AU";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import validateBrand from "../../utils/validates/validateBrand";
import { brandForm } from "../../static/Admin/Forms";

export default function MainBrand() {
  const brandData = React.useMemo(() => brandListData);
  const addData = () => {};
  const {
    values,
    handleChangeValue,
    handleSetValue,
    submit,
    errors,
    clearErrors,
    clearValues,
  } = useValidateForm(brandTemplateData, addData, validateBrand);

  const {
    isDelete,
    isEdit,
    isAdd,
    handleOpenEdit,
    handleCloseEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleOpenAdd,
    handleCloseAdd,
  } = useAdminController(
    handleChangeValue,
    handleSetValue,
    clearErrors,
    clearValues
  );

  const columns = [
    {
      title: "STT",
      key: "brand_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Tên hãng",
      dataIndex: "brand_name",
      key: "brand_name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Số điện thoại hãng",
      dataIndex: "brand_phone_number",
      key: "brand_phone_number",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Email hãng",
      dataIndex: "brand_email",
      key: "brand_email",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Địa chỉ hãng",
      dataIndex: "brand_address",
      key: "brand_address",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "brand_created_date",
      key: "brand_created_date",
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
    <div className="main_brand mx-2">
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
      <h1 className="text-4xl font-bold m-5">Quản lý hãng</h1>
      {/* <Section span={24}>
        <div className="wrapper p-8 ">
          <h3 className="text-2xl font-bold">Thêm hãng</h3>
          <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách hãng
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={brandDataCheck} />
          </div>
        </div>
      </Section> */}

      {isAdd && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn cancel-btn p-4 text-right "
              onClick={handleCloseAdd}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Thêm hãng</h3>
              <AU
                list={brandForm}
                dataInput={values}
                handleChangeDataInput={handleChangeValue}
                errors={errors}
                onSubmit={submit}
                label="Thêm"
                className={"confirm-btn"}
              />
            </div>
          </Section>
        </>
      )}

      {isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn cancel-btn p-4 text-right "
              onClick={handleCloseEdit}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Sửa hãng</h3>
              <AU
                list={brandForm}
                dataInput={values}
                handleChangeDataInput={handleChangeValue}
                errors={errors}
                onSubmit={submit}
                label="Sửa"
                className={"edit-btn"}
              />
            </div>
          </Section>
        </>
      )}

      {!isAdd && !isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn confirm-btn p-4 mr-5 text-right "
              onClick={handleOpenAdd}
            >
              Thêm tài khoản
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">Danh sách hãng</h3>
              <div className="table-wrapper">
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={brandData}
                  className="text-sm"
                />
              </div>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
