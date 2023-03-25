import React, { useState } from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import { Table } from "antd";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import {
  catalogTemplateData,
  catalogListData,
  catalogDataCheck,
} from "../../static/AdminData";
import { Input } from "antd";
import AU from "../Admin/AU";
import useCondition from "../../utils/hooks/Admin/useCondition";
import validateCatalog from "../../utils/validates/validateCatalog";

export default function MainCatalog() {
  const [
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
  ] = useAdminController(catalogTemplateData);

  const catalogData = React.useMemo(() => catalogListData);

  const catalogForm = [
    {
      label: "Tên danh mục",
      type: "text",
      name: "catalog_name",
    },
  ];
  const catalogInputData = {
    catalog_name: "",
  };
  const addData = (values) => {
    console.log(values);
  };
  const { values, handleChangeValues, submit, errors } = useCondition(
    catalogInputData,
    addData,
    validateCatalog
  );

  const columns = [
    {
      title: "STT",
      key: "product_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Tên danh mục",
      dataIndex: "catalog_name",
      key: "catalog_name",
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
    <div className="main_catalog mx-2">
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
      <h1 className="text-4xl font-bold m-5">Quản lý danh mục</h1>

      {isOpen && (
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
              <h3 className="text-2xl font-bold">Thêm danh mục</h3>
              <AU
                list={catalogForm}
                dataInput={values}
                handleChangeDataInput={handleChangeValues}
                errors={errors}
                onSubmit={submit}
                label="Thêm"
                className={"confirm-btn"}
              />
              {/* <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách danh mục
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={catalogDataCheck} />
          </div> */}
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
              <h3 className="text-2xl font-bold">Sửa danh mục</h3>
              <AU
                list={catalogForm}
                dataInput={values}
                handleChangeDataInput={handleChangeValues}
                errors={errors}
                onSubmit={submit}
                label="Sửa"
                className={"edit-btn"}
              />
            </div>
          </Section>
        </>
      )}

      {!isOpen && !isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn confirm-btn p-4 mr-5 text-right "
              onClick={handleOpenAdd}
            >
              Thêm danh mục
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">Danh sách danh mục</h3>
              <div className="table-wrapper">
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={catalogData}
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
