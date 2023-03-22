import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuList from "../components/Home/MenuList";
import BannerHighLand from "../components/Banner/BannerHighLand";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    navigate("coffe");
  }, []);

  return (
    <div className="">
      <BannerHighLand />
      <MenuList />
    </div>
  );
}
