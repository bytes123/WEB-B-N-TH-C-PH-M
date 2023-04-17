import React from "react";
import { BsTrash } from "react-icons/bs";
import Table from "../utils/components/Table";
import useCart from "../utils/hooks/useCart";
export default function CartPage() {
  const {
    values,
    handleUpQuantity,
    handleDownQuantity,
    handleChangeInputNumber,
    handleAllCheck,
    handleCheckById,
  } = useCart();

  const cartHeading = [
    {
      id: 0,
      title: (
        <input
          type="checkbox"
          onChange={(e) => handleAllCheck(e.target.checked)}
          className="scale-150  cursor-pointer "
        />
      ),
    },
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
    {
      id: 5,
      title: "Xóa",
    },
  ];

  return (
    <div className="cart_page ">
      <div className="grid grid-cols-3">
        <div className="p-8 mt-20  col-span-2">
          <div className="heading flex mb-20 font-quicksand justify-between">
            <div>
              <h1 className="mb-5  font-semibold text-6xl">Giỏ hàng của bạn</h1>
              <p className=" font-semibold text-2xl opacity-70">
                Có 3 sản phẩm trong giỏ của bạn
              </p>
            </div>
            <div className="flex items-center">
              <button className="font-semibold text-2xl flex items-center opacity-50 hover:bg-red-500 hover:text-white hover:opacity-100 p-4 rounded-xl transition-all">
                <BsTrash className=" mr-3" />
                Xóa giỏ hàng
              </button>
            </div>
          </div>
          <Table
            heading={cartHeading}
            list={values}
            handleUpQuantity={handleUpQuantity}
            handleDownQuantity={handleDownQuantity}
            handleChangeInputNumber={handleChangeInputNumber}
            handleCheckById={handleCheckById}
            theadClassName={"bg-slate-100 rounded-2xl"}
            thClassName={"p-8 text-2xl text-gray-700"}
          />
        </div>
      </div>
    </div>
  );
}
