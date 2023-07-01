import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

export default function MenuList({ data }) {
  const location = useLocation();
  const { menuid } = useParams();
  return (
    <div className="menu_list-wrapper">
      <ul className=" menu_list flex justify-center bg-green-500">
        {data.map((item) => {
          return (
            <li
              className={`menu_item mx-4 ${menuid == item.id ? "active" : ""}`}
              key={item.key}
            >
              <Link
                to={"/thuc-don/" + item.id}
                className="menu_item-link uppercase"
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
