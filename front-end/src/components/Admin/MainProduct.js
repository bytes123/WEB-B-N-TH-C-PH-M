import React, { useState } from "react";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import { Table } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import {
  productTemplateData,
  productListData,
  productDataCheck,
} from "../../static/AdminData";
import { Input } from "antd";
import { FaExchangeAlt } from "react-icons/fa";
import AU from "../Admin/AU";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import validateProduct from "../../utils/validates/validateProduct";
import { productForm } from "../../static/Admin/Forms";

export default function MainProduct() {
  const productData = React.useMemo(() => productListData);

  const columns = [
    {
      title: "STT",
      key: "product_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "product_image",
      key: "product_image",
      render: (data, arr, index) => (
        <img className="w-[80px]" src={data} alt="" />
      ),
    },
    {
      title: "Tên",
      dataIndex: "product_name",
      key: "product_name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Danh mục",
      dataIndex: "product_catalog",
      key: "product_catalog",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "product_price",
      key: "product_price",
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

  const addData = (values) => {
    console.log(values);
  };

  const productInputData = {
    product_name: "",
  };

  const {
    values,
    handleChangeValue,
    handleSetValue,
    submit,
    errors,
    clearErrors,
    clearValues,
  } = useValidateForm(productTemplateData, addData, validateProduct);

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

  return (
    <div className="main_product mx-2">
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
      <h1 className="text-4xl font-bold m-5">Quản lý sản phẩm</h1>

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
              <h3 className="text-2xl font-bold">Thêm sản phẩm</h3>
              <AU
                list={productForm}
                dataInput={values}
                handleChangeDataInput={handleChangeValue}
                errors={errors}
                onSubmit={submit}
                label="Thêm"
                className={"confirm-btn"}
              />
              {/* <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách sản phẩm
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
              <h3 className="text-2xl font-bold">Sửa sản phẩm</h3>
              <AU
                list={productForm}
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
              Thêm sản phẩm
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h3>
              <div className="table-wrapper">
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={productData}
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
