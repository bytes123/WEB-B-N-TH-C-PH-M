import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useMainUser(fetchUsers) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchUsers) {
        // Gửi các request lấy dữ liệu province và district cùng lúc
        const provinceRequests = fetchUsers.map(async (item) => {
          return getProvince(item.province_id);
        });
        const districtRequests = fetchUsers.map(async (item) => {
          return getDistrict(item.province_id, item.district_id);
        });

        const wardRequests = fetchUsers.map(async (item) => {
          return getWard(item.district_id, item.ward_id);
        });

        // Đợi tất cả các request hoàn thành
        const provinceResponses = await Promise.all(provinceRequests);
        const districtResponses = await Promise.all(districtRequests);
        const wardResponses = await Promise.all(wardRequests);

        // Set dữ liệu vào user
        const data = fetchUsers.map((user, index) => {
          return {
            ...user,
            user_province: provinceResponses[index],
            user_district: districtResponses[index],
            user_ward: wardResponses[index],
          };
        });

        setUsers(data);
      }
    };

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

  useEffect(() => {
    console.log(users);
  }, [users]);

  return { users, setUsers };
}
