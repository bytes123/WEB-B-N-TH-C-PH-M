import React, { useState } from "react";
import BannerSection from "../utils/components/BannerSection";
import ContentSectionFirst from "../components/Home/ContentSectionFirst";
import FeatureSwiper from "../components/Home/FeatureSwiper";
import FeatureProduct from "../components/Home/FeatureProduct";
import { nanoid } from "nanoid";
export default function HomePage() {
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

  return (
    <div className="home_page  h-full my-10 caret-transparent">
      <FeatureSwiper />
      <FeatureProduct title="Sản phẩm bán chạy" items={products} />
      <BannerSection
        img="section-img-1.jpg"
        children={<ContentSectionFirst />}
        background="#00b388"
      />
      <FeatureProduct title="Sản phẩm mới nhất" items={products} />
    </div>
  );
}
