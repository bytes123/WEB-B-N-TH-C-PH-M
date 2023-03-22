import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function DetailBill({ handleCloseDetailBill }) {
  const [billShip, setBillShip] = useState(true);
  return (
    <div className="detail_bill py-5">
      <div className="detail_bill-top">
        <div className="detail_bill-back" onClick={handleCloseDetailBill}>
          <p className="back text-uppercase text-3xl font-[600]">
            <ArrowBackIosIcon className="text-4xl" />
            Trở lại
          </p>
        </div>
        <div className="detail_bill-statement text-uppercase d-flex">
          <span className="bill_id">ID ĐƠN HÀNG: 123</span>
        </div>
      </div>

      <div className="main_detail-bill">
        <h3>CHI TIẾT SẢN PHẨM</h3>
        <ul className="detail_bill-list">
          <li className="detail_bill-item" key={1}>
            <div className="detail_bill-image-wrapper">
              <img
                src="https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg"
                alt=""
                className="detail_bill-image"
              />
            </div>
            <div className="detail_bill-infor">
              <p className="detail_bill-name fw-bold">Bánh ngọt</p>
            </div>
            <div className="detail_bill-price-wrapper">
              <p className="detail_bill-price fw-bold">323.000 VNĐ</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="detail_bill-total">
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">Ghi chú</div>
          <div className="detail_bill-price p-3 col-3">abc</div>
        </div>
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">Tổng tiền hàng</div>
          <div className="detail_bill-price p-3 col-3 fw-bold">
            132.0000 VNĐ
          </div>
        </div>

        <div className="detail_bill-ship-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">
            Phương thức thanh toán
          </div>
          {billShip ? (
            <div className="detail_bill-shi p-3 col-3 fw-bold">
              Thanh toán khi nhận hàng
            </div>
          ) : (
            <div className="detail_bill-shi p-3 col-3 ">Đã thanh toán</div>
          )}
        </div>
      </div>
      <div className="detail_bill-buttons ">
        <button className="btn btn-danger mt-3 btn-cancel ">Hủy đơn</button>
      </div>
    </div>
  );
}
