import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import StarpointSection from "../../components/Utils/StarpointSection";

export default function ItemList({ currentItems, isHiddenBtn, className }) {
  const handleAddCart = (item) => {
    console.log(item);
  };

  return (
    <div className={`item_list-wrapper  ${className}`}>
      <ul className="item_list grid lg:grid-cols-5 grid-cols-2 gap-10">
        {currentItems.map((item) => (
          <li className="item">
            <Link to={`/thuc-don/${item.catalog_name}/${item.key}`}>
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
                <Link
                  className="item_name mt-4"
                  to={`/thuc-don/${item.catalog_name}/${item.key}`}
                >
                  {item.product_name}
                </Link>
                <StarpointSection starpoint={item.product_starpoint} />
                <div className="item_card flex-wrap mt-5 flex items-center">
                  <div className="item_price">{item.product_price}</div>
                  <div className="item_price-discount">
                    {item.product_discount}
                  </div>
                  {!isHiddenBtn ? (
                    <div className="btn-wrapper mt-5">
                      <button
                        className="item_btn "
                        onClick={() => handleAddCart(item)}
                      >
                        <MdOutlineShoppingCart className="text-2xl mr-1" />
                        Thêm
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
