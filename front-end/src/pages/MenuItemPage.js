import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import BannerHighLand from "../components/Banner/BannerHighLand";
import SearchSection from "../components/Product/SearchSection";
import ItemList from "../components/Product/ItemList";
import { BiGridAlt, BiSort } from "react-icons/bi";
import useSearchByValue from "../utils/hooks/Search/useSearchByValue";
import { nanoid } from "nanoid";
import PaginatedItems from "../utils/components/PaginatedItems";
import usePagination from "../utils/hooks/usePagination";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import MainLoading from "../utils/components/MainLoading";

export default function MenuItemPage() {
  const { menuid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const searchMenu = [
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

  const [
    isOpenSearch,
    handleOpenSearch,
    handleCloseSearch,
    handleSwitchSearch,
    activeIndex,
    activeValueIndex,
    handleActiveValueIndex,
  ] = useSearchByValue();

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
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }
    setTimeout(() => {
      setIsLoading(false);

      document.body.style.overflow = "auto";
    }, 3000);
  }, []);

  const [currentItems, pageCount, handlePageClick] = usePagination(items, 2);

  return (
    <>
      <MainLoading isLoading={isLoading} />
      <div className="menu_item-wrapper">
        <BannerHighLand />
        <MenuList />

        <SearchSection
          isOpenSearch={isOpenSearch}
          activeIndex={activeIndex}
          data={searchMenu}
          onSwitch={handleSwitchSearch}
          activeValueIndex={activeValueIndex}
          onActiveValueIndex={handleActiveValueIndex}
        />
        <ItemList currentItems={currentItems} />
        <PaginatedItems
          previousLabel={<BsArrowLeft />}
          nextLabel={<BsArrowRight />}
          items={items}
          handlePageClick={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
