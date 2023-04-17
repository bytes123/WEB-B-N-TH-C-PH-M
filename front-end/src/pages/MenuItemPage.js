import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import BannerHighLand from "../components/Banner/BannerHighLand";
import ClassifySection from "../components/Product/ClassifySection";
import ItemList from "../components/Product/ItemList";
import { BiGridAlt, BiSort } from "react-icons/bi";
import { nanoid } from "nanoid";
import PaginatedItems from "../utils/components/PaginatedItems";
import usePagination from "../utils/hooks/usePagination";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import MainLoading from "../utils/components/MainLoading";
import useClassifySection from "../utils/hooks/useClassifySection";
import { ProductData } from "../static/Data";
import ClassifyItemSection from "../components/Product/ClassifyItemSection";

export default function MenuItemPage() {
  const { menuid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const classifyMenu = [
    {
      key: 1,
      icon: <BiGridAlt className="mx-1" />,
      content: "Hiển thị",
      value: [
        {
          key: 1,
          value: "50",
        },
        {
          key: 2,
          value: "100",
        },
      ],
    },
    {
      key: 2,
      icon: <BiSort className="mx-1" />,
      content: "Sắp xếp theo",
      value: [
        {
          key: 1,
          value: "Danh mục",
        },
        {
          key: 2,
          value: "Giá: Từ thấp đến cao",
        },
        {
          key: 3,
          value: "Giá: Từ cao đến thấp",
        },
      ],
    },
  ];

  const {
    handleSwitch,
    activeIndex,
    activeValueIndex,
    handleActiveValueIndex,
  } = useClassifySection();

  const [items, setItems] = useState([
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const waitLoading = setTimeout(() => {
      setIsLoading(false);

      document.body.style.overflow = "auto";
    }, 3000);

    return () => clearTimeout(waitLoading);
  }, []);

  const [currentItems, pageCount, handlePageClick] = usePagination(items, 2);

  return (
    <>
      <MainLoading isLoading={isLoading} />
      <div className="menu_item-wrapper">
        <BannerHighLand />
        <MenuList data={ProductData} />

        <div className="lg:grid lg:grid-cols-4 lg:px-10">
          <div className="lg:col-span-3">
            <ClassifySection
              activeIndex={activeIndex}
              data={classifyMenu}
              onSwitch={handleSwitch}
              activeValueIndex={activeValueIndex}
              onActiveValueIndex={handleActiveValueIndex}
            />
            <div className="container mx-auto py-10">
              <ItemList currentItems={currentItems} />

              <PaginatedItems
                previousLabel={<BsArrowLeft />}
                nextLabel={<BsArrowRight />}
                items={items}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
              <ClassifyItemSection className={" lg:hidden block"} />
            </div>
          </div>
          <ClassifyItemSection className={"py-10 lg:block hidden"} />
        </div>
      </div>
    </>
  );
}
