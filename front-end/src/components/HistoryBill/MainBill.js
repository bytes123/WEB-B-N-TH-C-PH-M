import React from "react";

export default function MainBill({ handleOpenDetailBill }) {
  return (
    <div className="bill_history py-5">
      <div className="bill_history-search logined">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng để tìm kiếm đơn hàng"
          // onChange={(e) => handleSearchBills(e)}
        />
      </div>
      <table className="bill_history-table table table-light">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">SĐT</th>
            <th scope="col">Ngày mua</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>asc</td>
            <td>asc</td>
            <td>asc</td>
            <td>
              27/09/2001
              {/* {moment(item.create_date).format("DD/MM/YYYY HH:mm:ss")} */}
            </td>
            <td>
              <button className="btn btn-dark" onClick={handleOpenDetailBill}>
                Xem chi tiết
              </button>
            </td>
          </tr>
          {/*               
                  <tr className=" my-5">
                    <td className="empty-basket">Không có đơn hàng nào</td>
                  </tr> */}
        </tbody>
      </table>
    </div>
  );
}
