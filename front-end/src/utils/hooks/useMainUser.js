import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  resetSearchStatus,
  fetchAllUser,
  getFetchSearchStatus,
  getSearchStatus,
  getSearchUsers,
  getAllUser,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function useMainUser() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [currentSearch, setCurrentSearch] = useState();
  const search_status = useSelector(getSearchStatus);
  const search_users = useSelector(getSearchUsers);
  const fetch_search_status = useSelector(getFetchSearchStatus);
  const fetchUsers = useSelector(getAllUser);
  const location = useLocation();

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllUsers(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    setUsers(search_users);
  }, [fetch_search_status]);

  const fetchData = async () => {
    if (fetchUsers) {
      setUsers(fetchUsers);
    }
  };

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setUsers(search_users);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    }
  }, [search_status]);

  useEffect(() => {
    fetchData();
  }, [fetchUsers]);

  const getProvince = async (province_id) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/`
      );
      if (response.data.results.length > 0) {
        return response.data.results.filter(
          (item) => item.province_id == province_id
        )[0];
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const getDistrict = async (province_id, district_id) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province_id}`
      );
      if (response.data.results.length > 0) {
        return response.data.results.filter(
          (item) => item.district_id == district_id
        )[0];
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const getWard = async (district_id, ward_id) => {
    try {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district_id}`
      );
      if (response.data.results.length > 0) {
        return response.data.results.filter(
          (item) => item.ward_id == ward_id
        )[0];
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value, callback) => {
    if (value !== "") {
      setCurrentSearch(value);
    }
    callback();
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllUsers(true);
    setTimeout(async () => {
      await dispatch(fetchAllUser()).unwrap();
      setIsLoadingAllUsers(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return {
    users,
    setUsers,
    isLoadingSearch,
    isSearch,
    handleSearch,
    handleOutSearch,
    isLoadingAllUsers,
    currentSearch,
  };
}
