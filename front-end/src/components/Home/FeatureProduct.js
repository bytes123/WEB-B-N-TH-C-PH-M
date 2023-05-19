import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ItemList from "../Product/ItemList";
import {
  fetchTopProducts,
  getTopProducts,
} from "../../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
export default function FeatureProduct({ type, title, categories, gridCol }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const dispatch = useDispatch();
  const top_products = useSelector(getTopProducts);
  const [categoryList, setCategoryList] = useState([
    {
      id: "all",
      name: "All",
    },
  ]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (type == "newest") {
      dispatch(
        fetchTopProducts({
          type: type,
          quantity: 10,
        })
      ).unwrap();
    }
  }, [type]);

  useEffect(() => {
    if (top_products.length) {
      setProducts(top_products);
    }
  }, [top_products]);

  useEffect(() => {
    setCategoryList([
      {
        id: "all",
        name: "All",
      },
      ...categories,
    ]);
  }, [categories]);

  const handleActiveCategory = (id) => {
    setActiveCategory(id);
  };

  return (
    <div className="my-20 px-10">
      <div>
        <div className="heading">
          <h1 className="text-5xl font-semibold font-quicksand">{title}</h1>
        </div>
        <div>
          <ul className="flex flex-wrap mt-5 font-quicksand">
            {categoryList
              ? categoryList.map((item, index) => (
                  <li
                    className={`category_item-select font-semibold mt-5 text-2xl cursor-pointer mr-5 ${
                      !activeCategory && index == 0
                        ? "text-brand"
                        : activeCategory == item.id
                        ? "text-brand"
                        : ""
                    }`}
                    onClick={() => handleActiveCategory(item.id)}
                  >
                    <p>{item.name}</p>
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <ItemList className={"my-20"} currentItems={products} />
      </div>
    </div>
  );
}
