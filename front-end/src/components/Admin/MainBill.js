import React from "react";
import Section from "../../utils/components/Section";
import { billListData } from "../../static/AdminData";
import { Space, Table, Tag } from "antd";

export default function MainBill() {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data) => <img className="w-[80px]" src={data} alt="" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Đơn giá",
      dataIndex: "bill_price",
      key: "bill_price",
    },
    {
      title: "Trạng thái",
      dataIndex: "bill_status",
      key: "bill_status",
      render: (_, { bill_status }) => {
        let color = bill_status == "Thành công" ? "green" : "gold";
        if (bill_status === "Cảnh báo") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={bill_status}>
            {bill_status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="flex">
          <button className="confirm-btn mr-5">Duyệt</button>
          <button className="delete-btn">Xóa</button>
        </div>
      ),
    },
  ];

  const data = React.useMemo(() => billListData);

  return (
    <div className="main_product mx-2">
      <Section span={24}>
        <div className="wrapper p-8">
          <h1 className="text-4xl font-bold mb-8">Quản lý đơn hàng</h1>
          <div className="table-wrapper">
            <Table
              bordered={true}
              columns={columns}
              dataSource={data}
              className="text-sm"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
