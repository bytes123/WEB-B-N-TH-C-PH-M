import React, { useEffect, useState } from "react";
import BannerSection from "../utils/components/BannerSection";
import ContentSectionFirst from "../components/Home/ContentSectionFirst";
import FeatureSwiper from "../components/Home/FeatureSwiper";
import FeatureProduct from "../components/Home/FeatureProduct";
import {
  getCategories,
  fetchCategory,
} from "../features/category/categorySlice";
import Toast from "../utils/components/Toast";
import { useSelector, useDispatch } from "react-redux";

import { nanoid } from "nanoid";
import useCart from "../utils/hooks/useCart";
export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const [products, setProducts] = useState([
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

  const { isToast } = useCart();

  useEffect(() => {
    dispatch(fetchCategory()).unwrap();
  }, []);

  return (
    <div className="home_page  h-full my-10 caret-transparent">
      <Toast
        position={isToast?.position}
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <FeatureSwiper />
      <FeatureProduct
        type="newest"
        title="Sản phẩm mới nhất"
        categories={categories}
        items={products}
      />

      <ContentSectionFirst />
      <FeatureProduct
        title="Sản phẩm bán chạy"
        categories={categories}
        items={products}
      />
    </div>
  );
}
