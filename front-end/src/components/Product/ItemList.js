import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
export default function ItemList({ currentItems }) {
  return (
    <div className="item_list-wrapper container mx-auto p-10">
      <ul className="item_list grid lg:grid-cols-5 grid-cols-2 gap-10">
        {currentItems.map((item) => (
          <li className="item ">
            <div className="label pink">
              <p>Hot</p>
            </div>
            <div className="item_img-wrapper ">
              <img
                src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg"
                alt=""
              />
            </div>
            <div className="item_information mt-4">
              <p className="item_catalog-label">{item.catalog_name}</p>
              <Link className="item_name mt-4">{item.product_name}</Link>
              <div className="item_starpoint-wrapper">
                <div className="item_star-rate">
                  <div
                    className="item_star-rating"
                    style={{ width: `${item.product_starpoint * 0.2 * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="item_card flex-wrap mt-5 flex items-center">
                <div className="item_price">{item.product_price}</div>
                <div className="item_price-discount">
                  {item.product_discount}
                </div>
                <div className="btn-wrapper">
                  <button className="item_btn ">
                    <MdOutlineShoppingCart className="text-2xl mr-1" />
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
