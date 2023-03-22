import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Size from "../components/Product/Size";

export default function ProductPage() {
  const { menuid, productid } = useParams();
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);

  const sizes = ["S", "M", "L"];

  const handleActiveSizeIndex = (index) => {
    setActiveSizeIndex(index);
  };

  const handleOrder = (id) => {
    console.log(id);
  };

  return (
    <div className="container mx-auto">
      <div className="wrapper ">
        <h1 className="product_title-big">FREEZE TRÀ XANH</h1>
        <div className="product-wrapper mt-[2rem] flex">
          <img
            className="product_img-single w-[300px] "
            src="https://www.highlandscoffee.com.vn/vnt_upload/product/11_2022/BR_Drink/HLC_New_logo_Products__FREEZE_TRA_XANH.png"
            alt=""
          />
          <div className="product_description px-5">
            <p>
              Thức uống rất được ưa chuộng! Trà xanh thượng hạng từ cao nguyên
              Việt Nam, kết hợp cùng đá xay, thạch trà dai dai, thơm ngon và một
              lớp kem dày phủ lên trên vô cùng hấp dẫn. Freeze Trà Xanh thơm
              ngon, mát lạnh, chinh phục bất cứ ai!
            </p>

            <div className="order-btn mt-5">
              <button
                className="cursor"
                onClick={() => handleOrder(activeSizeIndex)}
              >
                <img
                  className="w-[200px]"
                  src="https://www.highlandscoffee.com.vn/vnt_upload/product/04_2020/65-dat-mua-kmk.png"
                  alt=""
                />
              </button>
            </div>

            <div className="product_size-wrapper flex mt-5 items-center">
              <span>Size :</span>

              {sizes.map((item, index) => {
                return (
                  <Size
                    size={item}
                    onClick={() => handleActiveSizeIndex(index)}
                    active={activeSizeIndex == index}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
