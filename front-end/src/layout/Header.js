import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import { MdOutlineNavigateNext } from "react-icons/md";
import Modal from "../utils/components/Modal";
import { ReactComponent as StarBucksIcon } from "../assets/icons/starbucks.svg";
import HeaderBar from "../components/Header/HeaderBar";
import HeaderMenuItem from "../components/Header/HeaderMenuItem";
import useHeaderBar from "../utils/hooks/useHeaderBar";
import { DesktopMenu, MobileMenu, MobileMenuLogin } from "../static/HeaderMenu";
import { ProductData } from "../static/Data";
import { path } from "../static/Router";
import SubMenuMobile from "../components/Header/SubMenuMobile";
import useMobileSubMenu from "../utils/hooks/useMobileSubMenu";
import HeaderBarIcon from "../components/Header/HeaderBarIcon";
import HeaderUser from "../components/Header/HeaderUser";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import usePopup from "../utils/hooks/usePopup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Popup from "../utils/components/Popup";
import ProfileController from "../components/Header/ProfileController";
const { Header: AntdHeader } = Layout;
const desktopMenuClass =
  "hidden lg:flex flex-wrap w-full h-full caret-transparent px-3 text-[14px] font-bold flex items-center header-color header-bg-color";

const mobileMenuClass =
  "w-full caret-transparent px-3 text-[16px] font-bold  header-color header-bg-color";

export default function Header() {
  const [isPopupActive, handlePopup, handleClosePopup] = usePopup();

  let navigate = useNavigate();
  const location = useLocation();

  const activeMenuClass = (link) => {
    if (link === location.pathname) {
      return " active ";
    } else {
      return "";
    }
  };

  const seperateMenuClass = (link) => {
    if (link === path.login) {
      return " ml-auto ";
    } else {
      return "";
    }
  };

  // HANDLE HEADER BAR ON MOBILE
  const [isBarActive, setIsBarActive] = useHeaderBar();
  const [isOpenMobileSubMenu, setIsOpenMobileSubMenu] = useMobileSubMenu();

  const handleMobileBar = () => {
    setIsBarActive(!isBarActive);
  };
  const handleSubMenuMobile = (item) => {
    if (item.children) {
      return setIsOpenMobileSubMenu(!isOpenMobileSubMenu);
    } else {
      navigate(item.link);
    }
  };

  return (
    <div className="header bg-white">
      {/*  // HEADER */}
      <AntdHeader className="z-[999]  md:w-full pc flex items-center justify-between header-bg-color  header md:h-100">
        <HeaderBarIcon active={isBarActive} onClick={handleMobileBar} />
        <div className="header_image-wrapper">
          <img
            src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/logo.svg"
            className="cursor-pointer w-[140px]"
            onClick={() => navigate("/")}
          />
        </div>

        <Menu className={desktopMenuClass}>
          {DesktopMenu.map(
            (item) =>
              item.key !== "login" &&
              item.key !== "signup" && (
                <Menu.Item
                  key={item.key}
                  style={{ width: "auto" }}
                  onClick={(e) => navigate(item.link)}
                  className={
                    activeMenuClass(item.link) + seperateMenuClass(item.link)
                  }
                >
                  <span className="header_menu-title">{item.value}</span>
                  <HeaderMenuItem items={item.key == "menu" && ProductData} />
                </Menu.Item>
              )
          )}
        </Menu>

        <div className="wrapper flex items-center ">
          <div className="header_section flex mr-5  block lg:hidden">
            <div className="header_wishlist mr-3">
              <Link to="/yeu-thich" className="relative">
                <AiOutlineHeart className="text-5xl mx-2 opacity-70" />
                <span className="quanity-wishlist-card">0</span>
              </Link>
            </div>
            <div className="header_cart">
              <Link to="/gio-hang" className="relative">
                <AiOutlineShoppingCart className="text-5xl mx-2 opacity-70" />
                <span className="quanity-wishlist-card">0</span>
              </Link>
            </div>
          </div>
          <HeaderUser onPopup={handlePopup} />

          {/* POPUP PROFILE */}
          <Popup
            className={`${
              isPopupActive
                ? "block rounded-lg fixed right-5 top-[60px] w-[300px] p-3 "
                : "hidden"
            }`}
          >
            <div className="popup-wrapper">
              <ProfileController>
                <HeaderUser />
              </ProfileController>
            </div>
          </Popup>
        </div>
      </AntdHeader>
      {/*  // MOBILE BAR HEADER */}
      <HeaderBar active={isBarActive}>
        <Menu className={mobileMenuClass}>
          {MobileMenu.map((item) => {
            return (
              <Menu.Item
                key={item.key}
                style={{ width: "auto" }}
                onClick={() => handleSubMenuMobile(item)}
                className={`header_bar_menu-top  p-0 my-4 bg-transparent ${activeMenuClass(
                  item.link
                )}`}
              >
                <div className="header_bar_menu-title">
                  <span className="header_menu-title">{item.value}</span>
                  {item.children && <MdOutlineNavigateNext />}
                </div>
                {item.children && (
                  <SubMenuMobile
                    onBack={() => setIsOpenMobileSubMenu(false)}
                    active={isOpenMobileSubMenu}
                    items={item.children}
                  />
                )}
              </Menu.Item>
            );
          })}
        </Menu>
        <Menu className={mobileMenuClass + " flex"}>
          {MobileMenuLogin.map((item) => {
            return (
              <Menu.Item
                key={item.key}
                style={{ width: "auto" }}
                onClick={(e) => navigate(item.link)}
                className={`header_bar_menu-bottom bg-transparent`}
              >
                <span className="header_menu-title">{item.value}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </HeaderBar>
      <Modal active={isBarActive} />
    </div>
  );
}
