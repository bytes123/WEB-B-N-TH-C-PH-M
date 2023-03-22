import React, { useState } from "react";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import Section from "../../utils/components/Section";
import { Table } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import { Input } from "antd";
import { rateTemplateData, rateListData } from "../../static/AdminData";

export default function MainRate() {
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
  ] = useAdminController(rateTemplateData);

  const rateData = React.useMemo(() => rateListData);

  const columns = [
    {
      title: "STT",
      key: "rate_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Tên người đánh giá",
      dataIndex: "rate_user",
      key: "rate_user",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.rate_user ? rootData.rate_user : data}
            name="rate_user"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "rate_content",
      key: "rate_content",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.rate_content ? rootData.rate_content : data}
            name="rate_content"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },

    {
      title: "Số sao đánh giá",
      dataIndex: "rate_star",
      key: "rate_star",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={rootData.rate_star ? rootData.rate_star : data}
            name="rate_star"
            onChange={handleChangeInput}
          />
        ) : (
          <p>{data}</p>
        ),
    },

    {
      title: "Ngày đánh giá",
      dataIndex: "rate_created_date",
      key: "rate_created_date",
      render: (data, arr, index) =>
        !isEdit ? (
          <p>{data}</p>
        ) : index == rootData.row_index ? (
          <Input
            type="string"
            value={
              rootData.rate_created_date ? rootData.rate_created_date : data
            }
            name="rate_created_date"
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
                Duyệt
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
    <div className="main_rate mx-2">
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
      <h1 className="text-4xl font-bold m-5">Quản lý đánh giá</h1>
      <Section span={24}>
        <div className="wrapper p-8">
          <h3 className="text-2xl font-bold mb-5">Danh sách đánh giá</h3>
          <div className="table-wrapper">
            <Table
              bordered={true}
              columns={columns}
              dataSource={rateData}
              className="text-sm"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
