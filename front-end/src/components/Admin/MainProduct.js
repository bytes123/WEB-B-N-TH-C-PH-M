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

export default function MainProduct() {
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
  ] = useAdminController(productTemplateData);

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

            <img className="opacity-50" src={rootData.product_image} alt="" />
          </div>
        ) : (
          <img className="w-[80px]" src={data} alt="" />
        ),
    },
    {
      title: "Tên",
      dataIndex: "product_name",
      key: "product_name",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.product_name ? rootData.product_name : data}
            name="product_name"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Danh mục",
      dataIndex: "product_catalog",
      key: "product_catalog",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.product_catalog ? rootData.product_catalog : data}
            name="product_catalog"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "product_price",
      key: "product_price",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.product_price ? rootData.product_price : data}
            name="product_price"
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
      <Section span={24}>
        <div className="wrapper p-8 ">
          <h3 className="text-2xl font-bold">Thêm sản phẩm</h3>
          <p className="admin_product-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách sản phẩm
          </p>
          <div className="product_upload-wrapper">
            <UploadFileExcel dataCheck={productDataCheck} />
          </div>
        </div>
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
    </div>
  );
}
