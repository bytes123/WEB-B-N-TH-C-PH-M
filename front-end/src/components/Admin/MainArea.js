import React, { useEffect, useState } from "react";
import Section from "../../utils/components/Section";
import { billListData } from "../../static/AdminData";
import { Space, Table, Tag } from "antd";
import LoginDB from "./Area/LoginDB";
import axios from "axios";

export default function MainArea() {
  const data = React.useMemo(() => billListData);
  const [isAccess, setIsAccess] = useState(false);
  const [user, setUser] = useState({
    host: "",
    root: "",
    password: "",
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [isMigrating, setIsMigrating] = useState(false);

  function handleClick() {
    setIsMigrating(true);

    axios
      .post("http://localhost:8000/migrate", user)
      .then((response) => {
        alert(response.data);
        setIsMigrating(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Migration failed.");
        setIsMigrating(false);
      });
  }

  return (
    <div className="main_product mx-2">
      <Section span={24}>
        <div className="wrapper p-8 font-quicksand">
          <h1 className="text-4xl font-bold mb-8">Quản lý chi nhánh</h1>
          <LoginDB onAccess={setIsAccess} onLogin={setUser} />
          {isAccess ? (
            <>
              <button
                className="btn-primary text-2xl mb-5"
                onClick={handleClick}
                disabled={isMigrating}
              >
                Phân tán sang chi nhánh Hà Nội
              </button>
              {isMigrating ? "Migrating..." : "Migrate"}
              <br />
              <button className="btn-primary text-2xl">
                Phân tán sang chi nhánh Đà Nẵng
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </Section>
    </div>
  );
}
