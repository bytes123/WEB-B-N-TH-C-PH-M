import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useAddressForm(handleAddress, values, onClearErrors) {
  const [isSubCityList, setIsSubCityList] = useState(false);
  const [isSubDistrictList, setIsSubDistrictList] = useState(false);
  const [isSubWardList, setIsSubWardList] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState();
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const refCity = useRef(undefined);
  const refDistrict = useRef(undefined);
  const refWard = useRef(undefined);

  async function getCities() {
    try {
      const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=3"
      );
      if (response.data.length > 0) {
        setCityList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  const handleOpenCityList = (e) => {
    setIsSubCityList(!isSubCityList);
    document.addEventListener("click", (ev) => {
      if (refCity.current && !refCity.current.contains(ev.target)) {
        setIsSubCityList(false);
      }
    });
  };

  const handleOpenDistrictList = (e) => {
    setIsSubDistrictList(!isSubDistrictList);
    document.addEventListener("click", (ev) => {
      if (refDistrict.current && !refDistrict.current.contains(ev.target)) {
        setIsSubDistrictList(false);
      }
    });
  };

  const handleOpenWardList = (e) => {
    if (values.district && values.district.wards) {
      setIsSubWardList(!isSubWardList);
      document.addEventListener("click", (ev) => {
        if (refWard.current && !refWard.current.contains(ev.target)) {
          setIsSubWardList(false);
        }
      });
    } else {
      setIsSubWardList(false);
    }
  };

  const handleActiveCity = (cityItem) => {
    handleAddress("city", cityItem);
    onClearErrors();
    setIsSubCityList(false);
  };

  const handleActiveDistrict = (districtItem) => {
    handleAddress("district", districtItem);
    onClearErrors();
    setIsSubDistrictList(false);
  };

  const handleActiveWard = (wardItem) => {
    handleAddress("ward", wardItem);
    onClearErrors();
    setIsSubWardList(false);
  };

  useEffect(() => {
    handleAddress("district", "");
  }, [values.city]);

  useEffect(() => {
    handleAddress("ward", "");
  }, [values.district]);

  useEffect(() => {
    if (values.city && values.city.districts) {
      setDistrictList(values.city.districts);
    }
  }, [values.city]);

  useEffect(() => {
    if (values.district && values.district.wards) {
      setWardList(values.district.wards);
    }
  }, [values.district]);

  useEffect(() => {
    if (activeDistrict && activeDistrict.wards) {
      setWardList(activeDistrict.wards);
    }
  }, [activeDistrict]);

  useEffect(() => {
    if (cityList && cityList[49]) {
      handleAddress("city", cityList[49]);
    }
  }, [cityList]);

  return {
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
  };
}
