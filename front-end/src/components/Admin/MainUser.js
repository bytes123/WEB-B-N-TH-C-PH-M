import React, { useState, useEffect } from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import {
  userTemplateData,
  userListData,
  userDataCheck,
} from "../../static/AdminData";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import { Input } from "antd";
import { FaExchangeAlt } from "react-icons/fa";
import { Table } from "antd";

import AU from "../Admin/AU";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import validateUser from "../../utils/validates/validateUser";
import { userForm } from "../../static/Admin/Forms";
import Toast from "../../utils/components/Toast";
import AddForm from "./User/AddForm";
import {
  fetchAllUser,
  getAllUser,
  getAllUserStatus,
  getDeleteStatus,
  deleteUser,
  searchUser,
  getUpdateStatus,
  resetUpdateStatus,
  getSearchStatus,
  resetErrors,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../utils/components/Time";
import useMainUser from "../../utils/hooks/useMainUser";
import UpdateForm from "./User/UpdateForm";

export default function MainUser() {
  const { Search } = Input;
  const userData = React.useMemo(() => userListData);
  const dispatch = useDispatch();
  const fetchUsers = useSelector(getAllUser);
  const status = useSelector(getAllUserStatus);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);
  const search_status = useSelector(getSearchStatus);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const [error, setError] = useState({});

  const { users } = useMainUser(fetchUsers);

  const addData = (values) => {
    values.user_type = "admin";
  };
  const clearFetchError = async () => {
    await dispatch(resetUpdateStatus());
    await dispatch(resetErrors());
  };
  const { values, handleChangeValue, handleSetValue } = useValidateForm(
    addData,
    validateUser
  );

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setIsLoadingSearch(false);
    }
  }, [search_status]);

  const {
    isDelete,
    isEdit,
    isAdd,
    handleOpenEdit,
    handleCloseEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleOpenAdd,
    handleCloseAdd,
    idDelete,
  } = useAdminController(handleChangeValue, handleSetValue, clearFetchError);

  useEffect(() => {
    if (delete_status == "succeeded") {
      setIsToast({
        style: "success",
        value: true,
        body: "Xóa tài khoản thành công",
      });
    }

    return () =>
      setIsToast({
        value: false,
        body: "",
      });
  }, [delete_status]);

  useEffect(() => {
    console.log(users);
    dispatch(fetchAllUser()).unwrap();
  }, []);

  useEffect(() => {
    if (update_status == "succeeded") {
      const update = async () => {
        await dispatch(fetchAllUser()).unwrap();

        handleCloseEdit();
        setIsToast({
          style: "success",
          value: true,
          body: "Cập nhật tài khoản thành công",
        });
      };
      update();
    }

    return () =>
      setIsToast({
        value: false,
        body: "",
      });
  }, [update_status]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleEditBack = async () => {
    console.log(isEdit);
    handleCloseEdit();
  };

  useEffect(() => {
    if (!isEdit) {
      const reset = async () => {
        await dispatch(fetchAllUser()).unwrap();
        setError({});
      };
      reset();
    }
  }, [isEdit]);

  const handleConfirmDelete = async (user_name) => {
    try {
      await dispatch(deleteUser({ user_name: user_name })).unwrap();
      dispatch(fetchAllUser()).unwrap();
      handleCloseDelete();
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const handleSearch = async (value) => {
    if (!value) {
      setIsToast({
        style: "failed",
        value: true,
        body: "Vui lòng nhập tên tài khoản hoặc email để tìm kiếm",
      });
    } else {
      await dispatch(searchUser(value));
    }
  };

  useEffect(() => {
    return () =>
      setIsToast({
        style: "",
        value: false,
        body: "",
      });
  }, [isToast]);

  const columns = [
    {
      title: "STT",
      key: "row_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (data, arr, index) => (
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={`http://localhost:8000/resources/avatar/${data}`}
          alt=""
        />
      ),
    },
    {
      title: "Tên chủ tài khoản",
      dataIndex: "fullname",
      key: "fullname",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Tài khoản",
      dataIndex: "user_name",
      key: "user_name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (data, user, index) => (
        <p>
          {user.address +
            "," +
            user.ward_name +
            "," +
            user.district_name +
            "," +
            user.province_name}
        </p>
      ),
    },
    {
      title: "Trạng thái online",
      dataIndex: "online",
      key: "online",
      render: (data, arr, index) =>
        data ? (
          <p className="flex items-center mt-2">
            <p className="w-[10px] h-[10px] rounded-full bg-green-700"></p>
            <span className="text-xl ml-2 font-semibold text-brand">
              Online
            </span>
          </p>
        ) : (
          <p className="flex items-center mt-2">
            <p className="w-[10px] h-[10px] rounded-full bg-slate-700"></p>
            <span className="text-xl ml-2 font-semibold text-slate-500">
              Offline
            </span>
          </p>
        ),
    },
    {
      title: "Loại tài khoản",
      dataIndex: "detail_type_user",
      key: "detail_type_user",
      render: (data, arr, index) =>
        data.some((item) => item.type_user_id == "admin") ? (
          <div>
            <p className="font-bold text-red-700">Admin</p>
          </div>
        ) : data.some((item) => item.type_user_id == "admin-message") ? (
          <p className="font-semibold text-red-700">Quản lý tin nhắn</p>
        ) : data.some((item) => item.type_user_id == "normal-customer") ? (
          <p className="font-semibold text-slate-900">Khách hàng</p>
        ) : (
          <p className="font-semibold text-slate-900">None</p>
        ),
      // <GreenSwitch label="Admin" disabled defaultChecked={data} />
    },
    {
      title: "Thời gian tạo tài khoản",
      dataIndex: "created_date",
      key: "created_date",
      render: (data, arr, index) => <Time timestamp={data} />,
    },
    {
      title: "Thời gian cập nhật gần nhất",
      dataIndex: "modify_date",
      key: "modify_date",
      render: (data, arr, index) =>
        data ? <Time timestamp={data} /> : "Chưa cập nhật lần nào",
    },

    {
      title: "Hành động",
      dataIndex: "user_name",
      key: "user_name",
      render: (data, arr, index) => (
        <>
          <div className="flex">
            <button
              className="edit-btn mr-5"
              name="edit-btn"
              onClick={() => handleOpenEdit(arr, index)}
            >
              Sửa
            </button>
            <button
              className="delete-btn"
              onClick={() => handleOpenDelete(data)}
            >
              Xóa
            </button>
          </div>
          {isDelete ? (
            <ConfirmDialog
              active={true}
              onConfirm={() => handleConfirmDelete(idDelete)}
              onClose={handleCloseDelete}
              header={"Bạn có chắc muốn xóa cột này ?"}
              content={"Bạn sẽ không thể phục hồi sau khi xóa cột!"}
            />
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  return (
    <div className="main_user mx-2">
      <Toast
        style={isToast?.style}
        body={isToast.body}
        isSuccess={isToast.value}
      />
      <h1 className="text-4xl font-bold m-5">Quản lý tài khoản</h1>

      {isAdd && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn cancel-btn p-4 text-right "
              onClick={handleCloseAdd}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Thêm tài khoản</h3>
              <AddForm />
              {/* <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách tài khoản
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={catalogDataCheck} />
          </div> */}
            </div>
          </Section>
        </>
      )}

      {isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn cancel-btn p-4 text-right "
              onClick={handleEditBack}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Sửa tài khoản</h3>
              <UpdateForm
                error={error}
                setError={setError}
                updateValues={values}
              />
            </div>
          </Section>
        </>
      )}

      {!isAdd && !isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn confirm-btn p-4 mr-5 text-right "
              onClick={handleOpenAdd}
            >
              Thêm tài khoản
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold mb-5">Danh sách tài khoản</h3>
              <Search
                className="w-[400px]  my-5 "
                placeholder="Nhập tên tài khoản để tìm kiếm"
                enterButton="Tìm kiếm"
                size="large"
                onSearch={handleSearch}
                loading={isLoadingSearch}
              />
              <div className="table-wrapper">
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={users}
                  className="text-sm"
                />
              </div>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
