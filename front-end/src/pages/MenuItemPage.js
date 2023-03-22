import React from "react";
import { Link, useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import BannerHighLand from "../components/Banner/BannerHighLand";

export default function MenuItemPage() {
  const { menuid } = useParams();

  return (
    <div className="menu_item-wrapper">
      <BannerHighLand />
      <MenuList />
      <div className="item_list-wrapper container mx-auto p-10">
        <ul className="item_list grid lg:grid-cols-4 grid-cols-3 gap-10">
          <div className="item ">
            <div className="item_img-wrapper ">
              <img
                src="https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_86427bfa982f48188db23833b7196f2a_large.png"
                alt=""
              />
            </div>
            <div className="item_information mt-4">
              <Link className="item_name">Coffe Đen</Link>
              <div className="item_price">49.000 đ</div>
              <button className="item_btn font-bold rounded-lg p-4 mt-4">
                Đặt hàng ngay
              </button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
