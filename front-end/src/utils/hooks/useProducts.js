import React, { useState, useEffect } from "react";
import {
  fetchTopProducts,
  getTopProducts,
} from "../../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const top_products = useSelector(getTopProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchTopProducts({
        type: "newest",
        quantity: 20,
      })
    ).unwrap();
  }, []);

  useEffect(() => {
    if (top_products.length) {
      setProducts(top_products);
    }
  }, [top_products]);

  return {
    products,
  };
}
