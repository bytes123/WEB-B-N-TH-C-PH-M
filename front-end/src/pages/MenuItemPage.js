import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import Banner1 from "../components/Banner/Banner1";
import ClassifySection from "../utils/components/ClassifySection";
import ItemList from "../components/Product/ItemList";
import { useNavigate, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import PaginatedItems from "../utils/components/PaginatedItems";
import usePagination from "../utils/hooks/usePagination";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import MainLoading from "../utils/components/MainLoading";
import useClassifySection from "../utils/hooks/useClassifySection";
import { ProductData } from "../static/Data";
import ClassifyItemSection from "../components/Product/ClassifyItemSection";
import useProducts from "../utils/hooks/useProducts";
import {
  fetchCategoryAndChildren,
  getCategoryAndChildren,
} from "../features/category/categorySlice";
import useFilterProducts from "../utils/hooks/useFilterProducts";
import { useDispatch } from "react-redux";

export default function MenuItemPage() {
  const { menuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchCategoryAndChildren()).unwrap();
  }, []);

  const displayChildren = [
    {
      key: 20,
      value: 20,
    },
    {
      key: 40,
      value: 40,
    },
  ];

  const sortChildren = [
    {
      key: "newest",
      value: "Mới nhất",
    },
    {
      key: "DESC",
      value: "Giá: Từ thấp đến cao",
    },
    {
      key: "ASC",
      value: "Giá: Từ cao đến thấp",
    },
  ];

  const {
    handleSwitch,
    activeIndex,
    activeDisplayIndex,
    handleActiveDisplayIndex,
    activeSortIndex,
    handleActiveSortIndex,
    classifyMenu,
  } = useClassifySection(displayChildren, sortChildren);

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname == "/thuc-don") {
      navigate("all");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const waitLoading = setTimeout(() => {
      setIsLoading(false);

      document.body.style.overflow = "auto";
    }, 3000);

    return () => clearTimeout(waitLoading);
  }, []);

  useEffect(() => {
    handleActiveCategory(menuid);
    console.log(menuid);
  }, [menuid]);

  const { handleActiveCategory, activeCategory, categoryList, topProducts } =
    useFilterProducts(activeSortIndex, activeDisplayIndex);

  const { currentItems, pageCount, handlePageClick } = usePagination(
    topProducts,
    activeDisplayIndex
  );

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

  return (
    <>
      <MainLoading isLoading={isLoading} />
      <div className="menu_item-wrapper">
        <Banner1 />
        <MenuList data={categoryList} />

        <div className="lg:grid lg:grid-cols-4 lg:px-10">
          <div className="lg:col-span-3">
            <div className="mt-10">
              <ClassifySection
                className="justify-between"
                text="sản phẩm"
                activeIndex={activeIndex}
                data={classifyMenu}
                onSwitch={handleSwitch}
                activeDisplayIndex={activeDisplayIndex}
                onActiveDisplayIndex={handleActiveDisplayIndex}
                activeSortIndex={activeSortIndex}
                onActiveSortIndex={handleActiveSortIndex}
                productLength={topProducts.length}
              />
            </div>
            <div className="container mx-auto py-10">
              <ItemList currentItems={currentItems} gridCol={4} />

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
