import React, { useEffect } from "react";
import Section from "../../utils/components/Section";
import { Space, Table, Tag } from "antd";
import useAdminBill from "../../utils/hooks/Admin/useAdminBill";
import Toast from "../../utils/components/Toast";
import Spinner from "../../utils/components/Spinner";

export default function MainBill() {
  const { bills, handleUpdateStatement, isToast, isLoading } = useAdminBill();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số điện thoại khách hàng",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Địa chỉ khách hàng",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Đơn giá",
      dataIndex: "bill_price",
      key: "bill_price",
    },
    {
      title: "Trạng thái",
      dataIndex: "bill_statement",
      key: "bill_statement",
      render: (_, { bill_statement }) => {
        let color = "";
        if (bill_statement == "canceled") {
          color = "volcano";
        } else if (bill_statement == "confirmed") {
          color = "green";
        } else if (bill_statement == "succeeded") {
          color = "green";
        } else if (bill_statement == "pending") {
          color = "gold";
        }
        return (
          <Tag color={color} key={bill_statement}>
            {bill_statement == "succeeded"
              ? "Giao thành công".toUpperCase()
              : ""}
            {bill_statement == "confirmed" ? "Đã duyệt".toUpperCase() : ""}
            {bill_statement == "canceled" ? "Đã hủy".toUpperCase() : ""}
            {bill_statement == "pending" ? "Đang chờ duyệt".toUpperCase() : ""}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "watch",
      key: "watch",
      render: () => (
        <div className="flex justify-center">
          <button className="btn-dark font-semibold ">Xem chi tiết</button>
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "bill_statement",
      key: "action",
      render: (bill_statement, bill, index) => (
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            {bill_statement == "pending" ? (
              <button
                className="confirm-btn mb-5  font-semibold"
                onClick={() =>
                  handleUpdateStatement({
                    bill_statement: "confirmed",
                    id: bill.id,
                  })
                }
              >
                Duyệt
              </button>
            ) : (
              ""
            )}
            {bill_statement == "confirmed" ? (
              <button
                className="confirm-btn font-semibold"
                onClick={() =>
                  handleUpdateStatement({
                    bill_statement: "succeeded",
                    id: bill.id,
                  })
                }
              >
                Đã giao
              </button>
            ) : (
              ""
            )}
            {bill_statement == "pending" ? (
              <button className="delete-btn  mb-5  font-semibold ">Hủy</button>
            ) : (
              ""
            )}
          </div>
          <div>
            <button className="delete-btn font-semibold ml-5 inline">
              Xóa
            </button>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(bills);
  }, [bills]);

  return (
    <div className="main_product mx-2">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <Section span={24}>
        <div className="wrapper p-8">
          <h1 className="text-4xl font-bold mb-8">Quản lý đơn hàng</h1>
          <div className="table-wrapper">
            <Table
              bordered={true}
              columns={columns}
              dataSource={bills}
              className="text-sm"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
