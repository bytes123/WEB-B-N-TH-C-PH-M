import React, { useEffect } from "react";
import useCart from "../utils/hooks/useCart";
import useCheckout from "../utils/hooks/useCheckout";
import Table from "../components/Checkout/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { loginedUser } from "../utils/hooks/useAccessUser";
import { Input } from "antd";
export default function CheckoutPage() {
  const { cart } = useCart();

  const {
    checkoutCart,
    checkoutCartPrice,
    checkoutCartSubPrice,
    shipPrice,
    billInfor,
    handleCheckoutMethod,
    handleChange,
    isChange,
    handleCancelChange,
    newBillInfor,
    handleChangeNewBillInfor,
    handleSaveNewBillInfor,
  } = useCheckout(cart);

  const checkoutHeading = [
    {
      id: 1,
      title: "Sản phẩm",
    },
    {
      id: 2,
      title: "Giá",
    },
    {
      id: 3,
      title: "Số lượng",
    },
    {
      id: 4,
      title: "Thành tiền",
    },
  ];

  return (
    <div>
      {loginedUser ? (
        <div className="grid grid-cols-2">
          <div className="p-8 mt-20  lg:col-span-1 col-span-2">
            <div className="heading flex mb-20 font-quicksand justify-between">
              <div>
                <h1 className="mb-5  font-semibold text-6xl">Thanh toán</h1>
                <p className=" font-semibold text-2xl opacity-70">
                  Có {checkoutCart.length} sản phẩm sẽ được thanh toán
                </p>
              </div>
            </div>
            <div className="flex mb-10 justify-between">
              <Link to="/gio-hang">
                <button className="background-active font-bold flex items-center text-2xl text-white py-4 px-8 rounded-xl">
                  <IoMdArrowRoundBack className="mr-3 text-3xl" />
                  Quay lại giỏ hàng
                </button>
              </Link>
            </div>
            <Table
              checkedList={false}
              heading={checkoutHeading}
              list={checkoutCart}
              theadClassName={"bg-slate-100 rounded-2xl"}
              thClassName={"p-8 text-2xl text-gray-700"}
            />
          </div>
          <div className="lg:col-span-1 col-span-2">
            <div className="p-8 mt-20">
              <div className="border-3 p-10 max-w-[700px] rounded-2xl mx-auto font-quicksand">
                <div className="text-2xl font-semibold mb-5">
                  <div className="flex items-center justify-between">
                    {isChange?.full_name ? (
                      <>
                        <Input
                          name="full_name"
                          placeholder={"Nhập họ và tên"}
                          className="mr-10"
                          onChange={handleChangeNewBillInfor}
                        />
                        <button
                          className="edit-btn px-10 mr-5"
                          disabled={newBillInfor?.full_name ? false : true}
                          onClick={handleSaveNewBillInfor}
                        >
                          Lưu
                        </button>
                        <button
                          className="delete-btn px-10"
                          onClick={handleCancelChange}
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <span>Người nhận: {billInfor?.full_name}</span>
                        <button
                          className="btn-primary"
                          onClick={() => handleChange("full_name")}
                        >
                          Thay đổi họ và tên
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-2xl font-semibold mb-5">
                  <div className="flex items-center justify-between">
                    {isChange?.phone_number ? (
                      <>
                        <Input
                          name="phone_number"
                          type="number"
                          placeholder={"Nhập số điện thoại"}
                          className="mr-10"
                          onChange={handleChangeNewBillInfor}
                        />
                        <button
                          className="edit-btn px-10  mr-5"
                          disabled={newBillInfor?.phone_number ? false : true}
                          onClick={handleSaveNewBillInfor}
                        >
                          Lưu
                        </button>
                        <button
                          className="delete-btn px-10"
                          onClick={handleCancelChange}
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <span>Số điện thoại: {billInfor?.phone_number}</span>
                        <button
                          className="btn-primary"
                          onClick={() => handleChange("phone_number")}
                        >
                          Thay đổi số điện thoại
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-2xl font-semibold mb-5">
                  <div className="flex items-center justify-between">
                    {isChange?.address ? (
                      <>
                        <Input
                          name="address"
                          type="text"
                          placeholder={"Nhập địa chỉ"}
                          className="mr-10"
                          onChange={handleChangeNewBillInfor}
                        />
                        <button
                          className="edit-btn px-10  mr-5"
                          disabled={newBillInfor?.address ? false : true}
                          onClick={handleSaveNewBillInfor}
                        >
                          Lưu
                        </button>
                        <button
                          className="delete-btn px-10"
                          onClick={handleCancelChange}
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <span>Địa chỉ: {billInfor?.address}</span>
                        <button
                          className="btn-primary"
                          onClick={() => handleChange("address")}
                        >
                          Thay đổi địa chỉ
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="border p-12 max-w-[700px] rounded-2xl mx-auto">
                <div className="border  font-quicksand ">
                  <div className=" flex justify-between p-4">
                    <h4 className="text-3xl font-semibold opacity-70">
                      Đơn giá
                    </h4>
                    <p className="text-4xl font-bold text-brand">
                      {checkoutCartSubPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="border-t p-8">
                    <div className="border"></div>
                  </div>
                  <div className=" flex justify-between border-t p-4">
                    <h4 className="text-3xl font-semibold opacity-70">
                      Tiền Ship
                    </h4>
                    <p className="text-4xl font-bold text-brand">
                      {shipPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="border-t p-8">
                    <div className="border"></div>
                  </div>
                  <div className=" flex justify-between border-t py-4 px-10">
                    <h4 className="text-3xl font-semibold opacity-70">
                      Thành tiền
                    </h4>
                    <p className="text-4xl font-bold text-brand">
                      {checkoutCartPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
                <h3 className="my-5 text-3xl font-quicksand font-semibold">
                  Phương thức thanh toán
                </h3>
                <div className="border-1 mt-5 text-2xl font-medium font-quicksand">
                  <div
                    className="border-b-2 p-10 cursor-pointer"
                    onClick={() => handleCheckoutMethod("COD")}
                  >
                    <input
                      type="radio"
                      name="COD"
                      value="COD"
                      checked={billInfor.ship_method == "COD"}
                    />
                     <label>Thanh toán khi giao hàng (COD) </label>
                  </div>
                  <div
                    className="border-b-2 p-10 cursor-pointer"
                    onClick={() => handleCheckoutMethod("ATM")}
                  >
                    <div>
                      <input
                        type="radio"
                        name="ATM"
                        value="ATM"
                        checked={billInfor.ship_method == "ATM"}
                      />
                       <label>Chuyển khoản qua ngân hàng </label>
                    </div>

                    {billInfor.ship_method == "ATM" ? (
                      <div className="p-5">
                        <p>* Quý khách vui lòng thanh toán qua tài khoản:</p>
                        <p>- Chủ tài khoản: CTY CP ICON AND DENIM</p>
                        <p>- Tài khoản số: 4314767</p>
                        <p>- Mở tại ngân hàng: Á Châu ACB - CN Nguyễn Biểu</p>
                        <p>
                          * NV CSKH sẽ gọi điện thoại xác nhận với khách hàng
                          sau khi khách hàng đặt hàng.
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="border-b-2 p-10 cursor-pointer"
                    onClick={() => handleCheckoutMethod("PAYPAL")}
                  >
                    <input
                      type="radio"
                      name="PAYPAL"
                      value="PAYPAL"
                      checked={billInfor.ship_method == "PAYPAL"}
                    />
                     <label>Thanh toán PAYPAL </label>
                  </div>
                </div>
                <button className="background-active text-white font-semibold text-3xl w-100 py-5 px-10 mt-10 rounded-lg flex justify-center items-center">
                  thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
