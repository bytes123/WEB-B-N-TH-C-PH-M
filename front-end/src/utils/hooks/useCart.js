import React, { useState, useEffect } from "react";
import { loginedUser, expiredDate } from "./useAccessUser";
import {
  updateCart,
  addCart,
  resetAddCartStatus,
  getAddCartStatus,
  fetchCart,
  getCart,
  getUpdateCartStatus,
  resetUpdateCartStatus,
} from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { add } from "lodash";
import { fetchProducts } from "../../features/product/productSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function useCart() {
  const add_cart_status = useSelector(getAddCartStatus);
  const update_cart_status = useSelector(getUpdateCartStatus);
  const fetch_cart = useSelector(getCart);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartSubPrice, setCartSubPrice] = useState(0);
  const [error, setError] = useState({});
  const [shipPrice, setShipPrice] = useState(30000);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cartPrice = cart
      .filter((item) => item?.checked)
      .reduce((init, item) => init + item.quantity * item.newPrice, 0);

    setCartSubPrice(cartPrice);
    setCartPrice(cartPrice + shipPrice);
  }, [cart]);

  useEffect(() => {
    console.log(fetch_cart);
    if (fetch_cart.length) {
      let cartPrice = fetch_cart
        .filter((item) => item?.checked)
        .reduce((init, item) => init + item.quantity * item.newPrice, 0);

      setCartSubPrice(cartPrice);
      setCartPrice(cartPrice + shipPrice);

      setCart(fetch_cart);
    }
  }, [fetch_cart]);

  useEffect(() => {
    onFetchCart(loginedUser);
  }, [location]);

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });

  useEffect(() => {
    console.log(isToast);
  }, [isToast]);

  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  const onFetchCart = (data) => dispatch(fetchCart(data)).unwrap();

  const addSuccess = async () => {
    await onFetchCart(loginedUser);
    setIsToast({
      position: "top-center",
      style: "success",
      value: true,
      body: "Thêm sản phẩm vào giỏ thành công",
    });
  };

  const updateSuccess = async () => {
    await onFetchCart(loginedUser);
    setIsToast({
      position: "top-center",
      style: "success",
      value: true,
      body: "Cập nhật sản phẩm vào giỏ thành công",
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loginedUser);
  }, [loginedUser]);

  useEffect(() => {
    if (add_cart_status == "succeeded") {
      addSuccess();
    }

    return () => {
      dispatch(resetAddCartStatus());
      resetToast();
    };
  }, [add_cart_status]);

  useEffect(() => {
    if (update_cart_status == "succeeded") {
      updateSuccess();
    }

    return () => {
      dispatch(resetUpdateCartStatus());
      resetToast();
    };
  }, [update_cart_status]);

  const handleCheckOut = async () => {
    const cartChecked = cart.some((item) => item?.checked);

    if (cartChecked) {
      await dispatch(updateCart(cart));
      setError({});
      navigate("/thanh-toan");
    } else {
      setError({
        msg: "Vui lòng chọn sản phẩm trước khi thanh toán",
      });
    }
  };

  useEffect(() => {
    const timerReset = () =>
      setTimeout(() => {
        resetToast();
      }, 100);

    if (error?.msg) {
      setIsToast({
        position: "top-center",
        style: "failed",
        value: true,
        body: error.msg,
      });
    }
    timerReset();
    return () => clearTimeout(timerReset);
  }, [error]);

  const handleAddCart = (e, item) => {
    e.preventDefault();

    if (loginedUser) {
      const now = new Date();
      const isExpiring = now.getTime() < new Date(expiredDate).getTime();
      if (isExpiring) {
        dispatch(
          addCart({
            user: loginedUser,
            product: item,
            quantity: 1,
          })
        ).unwrap();
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  };

  const handleUpQuantity = (id) => {
    const newCart = cart.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      }
      return value;
    });

    setCart(newCart);
  };

  const handleDownQuantity = (id) => {
    const newCart = cart.map((value) => {
      if (value.id === id && value.quantity > 1) {
        return {
          ...value,
          quantity: value.quantity - 1,
        };
      }
      return value;
    });

    setCart(newCart);
  };

  const handleChangeInputNumber = (input, id) => {
    const newCart = cart.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: Number(input),
        };
      }
      return value;
    });

    setCart(newCart);
  };

  const handleAllCheck = (checked) => {
    const newCart = cart.map((value) => {
      return {
        ...value,
        checked: checked,
      };
    });

    setCart(newCart);
  };

  const handleCheckById = (id) => {
    const newCart = cart.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          checked: !value.checked,
        };
      }
      return value;
    });

    setCart(newCart);
  };

  return {
    handleAddCart,
    isToast,
    cart,
    onFetchCart,
    cartPrice,
    cartSubPrice,
    handleCheckOut,
    handleUpQuantity,
    handleDownQuantity,
    handleChangeInputNumber,
    handleAllCheck,
    handleCheckById,
    shipPrice,
  };
}
