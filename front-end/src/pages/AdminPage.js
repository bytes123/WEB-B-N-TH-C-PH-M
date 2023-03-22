import React from "react";
import { MainSideBar } from "../static/AdminData";
import AdminHeader from "../layout/AdminHeader";
import useAdminHeaderBar from "../utils/hooks/Admin/useAdminHeaderBar";

export default function AdminPage({ children }) {
  const [isBarActive, setIsBarActive] = useAdminHeaderBar();

  return (
    <div className="admin_page wrapper flex min-h-screen">
      <MainSideBar
        isBarActive={isBarActive}
        onBarActive={() => setIsBarActive(false)}
      />
      <div className="flex flex-col w-100 flex-1">
        <AdminHeader
          onBarActive={() => setIsBarActive(!isBarActive)}
          isBarActive={isBarActive}
        />

        {children}
      </div>
    </div>
  );
}
