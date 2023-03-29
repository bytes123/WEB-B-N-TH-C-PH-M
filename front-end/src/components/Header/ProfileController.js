import React from "react";
import { Link } from "react-router-dom";
import { CgPassword } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
export default function ProfileController({ children }) {
  return (
    <ul className="profile-list">
      <li className="profile-item p-3 mb-5 ">
        <Link to="/thong-tin-ca-nhan" className="flex items-center h-[40px]">
          {children}
          <span className="ml-5 font-semibold">Minh Tân</span>
        </Link>
      </li>
      <li className="/profile-item p-3 mb-5 ">
        <Link to="/lich-su" className="flex items-center h-[40px]">
          <FaMoneyBillWave className="text-5xl" />
          <span className="ml-5 font-semibold">Lịch sử đơn hàng</span>
        </Link>
      </li>
      <li className="profile-item p-3 mb-5 ">
        <Link to="/doi-mat-khau" className="flex items-center h-[40px]">
          <CgPassword className="text-5xl" />
          <span className="ml-5 font-semibold">Đổi mật khẩu</span>
        </Link>
      </li>
      <li className="profile-item p-3 mb-5 ">
        <div className="cursor-pointer flex items-center h-[40px]">
          <MdLogout className="text-5xl" />
          <span className="ml-5 font-semibold">Đăng xuất</span>
        </div>
      </li>
    </ul>
  );
}
