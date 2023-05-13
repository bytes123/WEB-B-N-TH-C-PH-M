import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loginedUser } from "./useAccessUser";

export default function useCheckout(cart) {
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [checkoutCartPrice, setCheckoutCartPrice] = useState(0);
  const [checkoutCartSubPrice, setCheckoutCartSubPrice] = useState(0);
  const [shipPrice, setShipPrice] = useState(30000);
  const location = useLocation();
  const [billInfor, setBillInfor] = useState({
    ship_method: "COD",
  });

  const [newBillInfor, setNewBillInfor] = useState();

  const [isChange, setIsChange] = useState();

  useEffect(() => {
    if (loginedUser) {
      setBillInfor({
        ...billInfor,
        user_name: loginedUser.user_name,
        phone_number: loginedUser.phone_number,
        full_name: loginedUser.fullname,
        address:
          loginedUser.address +
          "," +
          loginedUser.ward_name +
          "," +
          loginedUser.district_name +
          "," +
          loginedUser.province_name,
      });
    }
  }, [loginedUser]);

  useEffect(() => {
    if (cart?.length) {
      setCheckoutCart(cart.filter((item) => item?.checked));
    }
  }, [cart, location]);

  useEffect(() => {
    if (checkoutCart.length) {
      let checkoutCartPrice = checkoutCart.reduce(
        (init, item) => init + item.quantity * item.newPrice,
        0
      );

      setCheckoutCartSubPrice(checkoutCartPrice);
      setCheckoutCartPrice(checkoutCartPrice + shipPrice);
    }
  }, [checkoutCart]);

  const handleCheckoutMethod = (value) => {
    setBillInfor({
      ...billInfor,
      ship_method: value,
    });
  };

  const handleChange = (name) => {
    setNewBillInfor();
    setIsChange({
      [name]: name,
    });
  };

  const handleCancelChange = () => {
    setNewBillInfor();
    setIsChange();
  };

  const handleChangeNewBillInfor = (e) => {
    setNewBillInfor({
      ...newBillInfor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveNewBillInfor = () => {
    setIsChange();
    setBillInfor({
      ...billInfor,
      ...newBillInfor,
    });
  };

  useEffect(() => {
    console.log(billInfor);
  }, [billInfor]);

  return {
    checkoutCart,
    checkoutCartPrice,
    checkoutCartSubPrice,
    shipPrice,
    billInfor,
    loginedUser,
    billInfor,
    handleCheckoutMethod,
    handleChange,
    isChange,
    handleCancelChange,
    handleChangeNewBillInfor,
    newBillInfor,
    handleSaveNewBillInfor,
  };
}
