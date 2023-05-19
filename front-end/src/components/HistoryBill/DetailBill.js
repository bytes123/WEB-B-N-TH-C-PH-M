import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { loginedUser } from "../../utils/hooks/useAccessUser";
export default function DetailBill({
  bill,
  detailBill,
  billId,
  handleCloseDetailBill,
  handleUpdateStatement,
  isAdmin = false,
}) {
  const [billShip, setBillShip] = useState(true);
  console.log(detailBill);
  return (
    <div className="detail_bill py-5">
      <div className="detail_bill-top">
        <div className="detail_bill-back mb-5" onClick={handleCloseDetailBill}>
          <p className="back text-uppercase text-3xl font-[600]">
            <ArrowBackIosIcon className="text-4xl" />
            Trở lại
          </p>
        </div>
        <div className=" d-flex justify-end mb-5">
          <span className="bill_id border-r-4 pr-4">
            MÃ ĐƠN HÀNG: <span className="font-semibold">{bill?.id}</span>
          </span>
        </div>
      </div>

      <div className="main_detail-bill font-quicksand">
        <h3 className="text-4xl mb-5">CHI TIẾT SẢN PHẨM</h3>
        <ul className="detail_bill-list">
          {detailBill.map((item) => (
            <li className="mb-10 border-1 rounded-xl p-5">
              <div>
                <div className="flex">
                  <div className="border-1 inline-block">
                    <img
                      className="w-[120px]"
                      src={
                        item.image1 !== "default.jpg"
                          ? `http://localhost:8000/resources/product/${item.product_id}/${item.image1}`
                          : `http://localhost:8000/resources/product/${item.image1}`
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-5 flex justify-between w-full items-center">
                    <div>
                      <p className="text-3xl mb-2">{item?.name}</p>
                      <p className="text-2xl mb-2 text-slate-500">
                        Phân loại hàng: {item?.size}
                      </p>
                      <p className="text-3xl mb-2">x{item?.quantity}</p>
                    </div>
                    <div className="text-2xl">
                      <span className="line-through mr-2">
                        {item?.price?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="font-semibold text-orange-500">
                        {item?.currentPrice?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-10 flex justify-end items-center pr-20">
                  <span className="text-2xl">Thành tiền: </span>
                  <span className="font-semibold text-3xl text-orange-600 ml-2">
                    {item?.newPrice?.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="detail_bill-total text-3xl font-quicksand">
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">Ghi chú</div>
          <div className="detail_bill-price p-3 col-3">{bill?.note}</div>
        </div>
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">Tổng tiền hàng</div>
          <div className="detail_bill-price p-3 col-3 fw-bold text-5xl text-orange-600">
            {bill?.bill_price?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>

        <div className="detail_bill-ship-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">
            Phương thức thanh toán
          </div>
          {bill?.checkout_method == "COD" ? (
            <div className="detail_bill-shi p-3 col-3 fw-bold">
              Thanh toán khi nhận hàng
            </div>
          ) : bill?.checkout_method == "ATM" ? (
            <div className="detail_bill-shi p-3 col-3 fw-bold">
              Thanh toán bằng thẻ ATM
            </div>
          ) : bill?.checkout_method == "PAYPAL" ? (
            <div className="detail_bill-shi p-3 col-3 fw-bold">
              Thanh toán bằng PAYPAL
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">
            Trạng thái thanh toán
          </div>
          <div className=" p-3 col-3 fw-bold ">
            {bill?.bill_payed == 1 ? (
              <div className=" p-3 col-9">Đã thanh toán</div>
            ) : bill?.bill_payed == 0 ? (
              <div className=" p-3 col-9">Chưa thanh toán</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">
            Trạng thái giao hàng
          </div>
          <div className=" p-3 col-3 fw-bold ">
            {bill?.bill_statement == "canceled" ? (
              <div className=" p-3 col-9">Đã hủy</div>
            ) : bill?.bill_statement == "confirmed" ? (
              <div className=" p-3 col-9">Đang giao hàng</div>
            ) : bill?.bill_statement == "ship_success" ? (
              <div className=" p-3 col-9">Giao hàng thành công</div>
            ) : bill?.bill_statement == "success" ? (
              <div className=" p-3 col-9">Nhận hàng thành công</div>
            ) : bill?.bill_statement == "pending" ? (
              <div className=" p-3 col-9">Đang chờ duyệt</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="detail_bill-buttons font-quicksand mt-10">
        {bill?.bill_statement == "ship_success" &&
        loginedUser?.user_name == bill?.user_name &&
        !isAdmin ? (
          <button
            className="btn  mt-3 btn-success mr-10 text-2xl p-5"
            onClick={() =>
              handleUpdateStatement({
                bill_statement: "success",
                id: bill?.id,
              })
            }
          >
            Đã nhận hàng
          </button>
        ) : (
          ""
        )}
        {bill?.checkout_method == "COD" &&
        bill?.bill_statement == "pending" &&
        loginedUser?.user_name == bill?.user_name &&
        !isAdmin ? (
          <button
            className="btn btn-danger mt-3 btn-cancel text-2xl"
            onClick={() =>
              handleUpdateStatement({
                bill_statement: "canceled",
                id: bill?.id,
              })
            }
          >
            Hủy đơn
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
