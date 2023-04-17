import React from "react";
import useAddressForm from "../hooks/useAddressForm";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";

export default function AddressForm({
  errors,
  onClearErrors,
  handleAddress,
  values,
}) {
  const {
    isSubCityList,
    isSubDistrictList,
    isSubWardList,
    refCity,
    refDistrict,
    refWard,
    handleOpenCityList,
    handleOpenDistrictList,
    handleOpenWardList,
    cityList,
    districtList,
    wardList,
    handleActiveWard,
    handleActiveCity,
    handleActiveDistrict,
  } = useAddressForm(handleAddress, values, onClearErrors);

  return cityList.length ? (
    <>
      <h4 className="text-lg font-semibold">Địa chỉ người dùng</h4>
      <div className="checkout_profile-address-wrapper my-10  ">
        <div
          className="checkout_profile-province address-item col-6"
          ref={refCity}
        >
          <div
            className="checkout_province-selected address-selected"
            onClick={(e) => handleOpenCityList(e)}
          >
            <p>
              {values.user_city && values.user_city.name
                ? values.user_city.name
                : ""}
            </p>
            <ArrowDropDownIcon />
          </div>
          <div
            className={
              isSubCityList ? "checkout_ship-sub active" : "checkout_ship-sub"
            }
          >
            <div className="checkout_adrress-search ">
              <input
                type="text"
                className="checkout_address-search-input"
                placeholder="Nhập tỉnh,thành để tìm kiếm nhanh"
              />
              <div className="checkout_search-icon">
                <SearchIcon />
              </div>
            </div>
            <ul className="checkout_province-list address-subList ">
              {cityList.map((item, index) => (
                <li
                  className="checkout_province-item"
                  key={index}
                  onClick={() => handleActiveCity(item)}
                >
                  <p className="address-subItem">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="checkout_profile-district address-item col-6"
          ref={refDistrict}
        >
          <div
            className={
              errors.user_district
                ? "checkout_district-selected address-selected error-input"
                : "checkout_district-selected address-selected"
            }
            onClick={(e) => handleOpenDistrictList(e)}
          >
            <p>
              {values.user_district && values.user_district.name
                ? values.user_district.name
                : "Chọn Quận / huyện"}
            </p>
            <ArrowDropDownIcon />
          </div>
          {errors.user_district ? (
            <p className="error-text">{errors.user_district}</p>
          ) : (
            ""
          )}
          <div
            className={
              isSubDistrictList
                ? "checkout_ship-sub active"
                : "checkout_ship-sub"
            }
          >
            <div className="checkout_adrress-search ">
              <input
                type="text"
                className="checkout_address-search-input"
                placeholder="Nhập quận,huyện để tìm kiếm nhanh"
              />
              <div className="checkout_search-icon">
                <SearchIcon />
              </div>
            </div>
            <ul className="checkout_province-list address-subList ">
              {districtList.map((item, index) => (
                <li
                  className="checkout_province-item "
                  key={index}
                  onClick={() => handleActiveDistrict(item)}
                >
                  <p className="address-subItem">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="checkout_profile-ward address-item col-6" ref={refWard}>
          <div
            className={
              errors.user_ward
                ? "checkout_ward-selected address-selected error-input"
                : "checkout_ward-selected address-selected"
            }
            onClick={(e) => handleOpenWardList(e)}
          >
            <p>
              {values.user_ward && values.user_ward.name
                ? values.user_ward.name
                : "Chọn Phường / Xã"}
            </p>
            <ArrowDropDownIcon />
          </div>
          {errors.user_ward ? (
            <p className="error-text">{errors.user_ward}</p>
          ) : (
            ""
          )}
          <div
            className={
              isSubWardList ? "checkout_ship-sub active" : "checkout_ship-sub"
            }
          >
            <div className="checkout_adrress-search ">
              <input
                type="text"
                className="checkout_address-search-input"
                placeholder="Nhập phường,xã để tìm kiếm nhanh"
              />
              <div className="checkout_search-icon">
                <SearchIcon />
              </div>
            </div>
            <ul className="checkout_province-list address-subList row">
              {wardList.map((item, index) => (
                <li
                  className="checkout_province-item"
                  key={index}
                  onClick={() => handleActiveWard(item)}
                >
                  <p className="address-subItem">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="checkout_profile-myAdress address-item col-6">
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            name="address"
            className={
              errors.address
                ? "checkout_profile-address h-full rounded-lg h-[33px] p-3 outline-none checkout_text-input w-100 error-input"
                : "checkout_profile-address h-full rounded-lg h-[33px] p-3 outline-none checkout_text-input w-100"
            }
            value={values.address}
            onChange={(e) => handleAddress("address", e.target.value)}
          />
          {errors.address ? <p className="error-text">{errors.address}</p> : ""}
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
