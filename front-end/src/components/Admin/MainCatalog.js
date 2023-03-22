import React from "react";
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

export default function MainCatalog() {
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
  ] = useAdminController(catalogTemplateData);

  const catalogData = React.useMemo(() => catalogListData);

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
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.catalog_name ? rootData.catalog_name : data}
            name="catalog_name"
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
      <Section span={24}>
        <div className="wrapper p-8 ">
          <h3 className="text-2xl font-bold">Thêm danh mục</h3>
          <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách danh mục
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={catalogDataCheck} />
          </div>
        </div>
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
    </div>
  );
}
