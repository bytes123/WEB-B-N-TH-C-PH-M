import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Size from "../components/Product/Size";
import StarpointSection from "../components/Utils/StarpointSection";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import useInputNumber from "../utils/hooks/useInputNumber";
import usePickSection from "../utils/hooks/usePickSection";
import { AiOutlineHeart } from "react-icons/ai";
import DescriptionSection from "../components/Product/DescriptionSection";
import ReviewSection from "../components/Product/ReviewSection";
import ItemList from "../components/Product/ItemList";
import { nanoid } from "nanoid";

import ClassifyItemSection from "../components/Product/ClassifyItemSection";

export default function ProductPage() {
  const { menuid, productid } = useParams();
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const {
    inputNumberValue,
    handleUpInputNumber,
    handleDownInputNumber,
    handleChangeInputNumber,
  } = useInputNumber();

  const { activeIndexSection, handleActiveIndexSection } = usePickSection();

  const handleActiveSizeIndex = (index) => {
    setActiveSizeIndex(index);
  };

  const [relatedItems, setRelatedItems] = useState([
    {
      key: nanoid(),
      catalog_name: "Bánh",
      product_name: "Bánh mì sữa bò tươi ngon",
      product_starpoint: 3,
      product_price: "5900000",
      product_discount: "200000",
    },
    {
      key: nanoid(),
      catalog_name: "Bánh",
      product_name: "Bánh mì sữa bò tươi ngon",
      product_starpoint: 3,
      product_price: "5900000",
      product_discount: "200000",
    },
    {
      key: nanoid(),
      catalog_name: "Bánh",
      product_name: "Bánh mì sữa bò tươi ngon",
      product_starpoint: 3,
      product_price: "5900000",
      product_discount: "200000",
    },
  ]);

  return (
    <div className="lg:px-20 px-40  mx-auto py-20">
      <div className="wrapper ">
        <div className="product-wrapper mt-[2rem] lg:grid lg:grid-cols-8 ">
          <div className="product_image lg:col-span-3 flex justify-center ">
            <img
              className="product_img-single object-contain lg:max-h-[500px]  rounded-2xl"
              src="https://www.highlandscoffee.com.vn/vnt_upload/product/11_2022/BR_Drink/HLC_New_logo_Products__FREEZE_TRA_XANH.png"
              alt=""
            />
          </div>
          <div className="product_detail lg:col-span-3 px-20 mt-10">
            <div className="stock-status out-stock mb-5">Sale Off</div>
            <div className="product_heading mb-7">
              <h2
                className="font-quicksand text-6xl font-bold"
                style={{ color: "#253D4E" }}
              >
                Seeds of Change Organic Quinoa, Brown
              </h2>
            </div>
            <div className="product_starpoint mb-7 ">
              <StarpointSection starpoint={4} className="inline" />
              <span className="opacity-60 font-bold ml-5">
                (32 lượt nhận xét ){" "}
              </span>
            </div>
            <div className="product_price-wrapper flex font-quicksand">
              <span className="current-price text-brand ">3800000</span>
              <div className="sale-price-wrapper ml-4 flex flex-col justify-center">
                <span className="sale-price">28%</span>
                <span className="old-price">5800000</span>
              </div>
            </div>
            <div className="product_description-wrapper">
              <p className="text-2xl opacity-70 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                soluta hic quo ullam. Recusandae enim soluta perspiciatis,
                consectetur maxime asperiores?
              </p>
            </div>
            <div className="product_size-wrapper mt-10 flex items-center font-bold ">
              <span>Kích thước:</span>
              <ul className="product_size-list ml-5 flex items-center cursor-pointer">
                {["50g", "40g"].map((item, index) => (
                  <li
                    onClick={() => handleActiveSizeIndex(index)}
                    key={index}
                    className={`product_size-item ${
                      activeSizeIndex == index ? "active" : ""
                    } rounded-xl  mx-1 p-4`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="product_section mt-10 flex">
              <div className="product_quantity-select flex items-center rounded-md  border-active">
                <input
                  type="number"
                  className="outline-none text-center border-none w-[50px] rounded-md p-5 font-mono text-3xl"
                  step={false}
                  value={inputNumberValue}
                  onChange={handleChangeInputNumber}
                />
                <div className="up-down h-100 text-active d-flex flex-col justify-center cursor-pointer">
                  <MdKeyboardArrowUp
                    onClick={handleUpInputNumber}
                    className="h-100 text-3xl"
                  />
                  <MdKeyboardArrowDown
                    onClick={handleDownInputNumber}
                    className="h-100 text-3xl"
                  />
                </div>
              </div>
              <div className="cart_wrapper-add ml-5">
                <button className="text-2xl p-5 h-100 font-bold rounded-md text-white background-active">
                  Thêm vào giỏ
                </button>
              </div>
              <div className="favorite-action updown-action ml-5 rounded-md px-6 cursor-pointer border flex items-center">
                <AiOutlineHeart className="opacity-60 text-4xl" />
              </div>
              {/* <div className="favorite-action updown-action ml-5 rounded-md px-6 cursor-pointer border flex items-center">
                <AiOutlineHeart className="opacity-60 text-4xl" />
              </div> */}
            </div>
            <div className="product-details-wrapper mt-20 w-[80%]">
              <ul className="grid grid-rows-2 grid-cols-2 opacity-70">
                <li>
                  Danh mục: <span className="text-active">Organic</span>
                </li>
                <li>
                  Hãng: <span className="text-active">Organic</span>
                </li>
                <li>
                  Mã sản phẩm: <span className="text-active">Organic</span>
                </li>
                <li>
                  Số lượng: <span className="text-active">Organic</span>
                </li>
              </ul>
            </div>
          </div>
          <ClassifyItemSection className={"lg:col-span-2 lg:block hidden"} />
        </div>
        <div className="product_section p-10 mt-20 w-full rounded-xl border">
          <ul className="product_information-list">
            {["Mô tả", "Reviews"].map((item, index) => (
              <li
                key={index}
                className={`${activeIndexSection == index ? "active" : ""}`}
                onClick={() => handleActiveIndexSection(index)}
              >
                <p>{item}</p>
              </li>
            ))}
          </ul>

          <div className="product_information-main">
            {[<DescriptionSection />, <ReviewSection />].map((item, index) =>
              activeIndexSection == index
                ? React.cloneElement(item, {
                    className: "visible-transition",
                  })
                : React.cloneElement(item, {
                    className: "hidden-transition",
                  })
            )}
          </div>
        </div>
        <div className="product_related-section">
          <div className="product_realted-heading border-collapse">
            <h2 className="font-semibold text-4xl pt-20 pb-10 ">
              Sản phẩm liên quan
            </h2>
          </div>
          <ItemList
            className={"py-20"}
            currentItems={relatedItems}
            isHiddenBtn={true}
          />
        </div>
        <ClassifyItemSection className={" block lg:hidden"} />
      </div>
    </div>
  );
}
