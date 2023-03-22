import React, { useEffect } from "react";
import { menuData } from "../../static/HeaderMenu";
import { path } from "../../static/Router";
import { Link } from "react-router-dom";
import { ProductData } from "../../static/Data";
export default function HeaderMenuItem({ items }) {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return items ? (
    <div className="header_menu-item" onClick={handleStopPropagation}>
      <ul className="menu_list">
        {ProductData.map((item) => (
          <li className="menu_item" key={item.key}>
            <Link to={item.link} className="menu_item-title">
              {item.value}
            </Link>
            <ul className="menu_list-children">
              {item.children &&
                item.children.map((item) => (
                  <li className="menu_item-children" key={item.key}>
                    <Link to={item.link} className="menu_item-children-title">
                      {item.value}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    ""
  );
}
