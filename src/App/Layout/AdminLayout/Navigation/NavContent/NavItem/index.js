import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import browserRoute from "../../../../../../Constants/browserRoutes";

const NavItem = ({ item }) => {
  const [color, setColor] = useState("rgba(255, 255, 255, 0.5)");

  useEffect(() => {
    let pathNameSplit = window.location.pathname.split("/");
    let parentPathName = `/${pathNameSplit[1]}/${pathNameSplit[2]}`;
    if (parentPathName === item.url) {
      setColor("white");
    } else {
      setColor("rgba(255, 255, 255, 0.5)");
    }
  }, [window.location.pathname, color, item.url]);

  return (
    <Fragment>
      <Link
        className="nav-link"
        to={item.url || browserRoute.BLANK_LINK}
        style={{ color: color }}
      >
        <div className="sb-nav-link-icon">
          <i  className={item.title==="Subscriptions"?
          `${item.icon} set-alignment`
          :item.icon
          }>
          </i>
        </div>
        {item.title}
      </Link>
    </Fragment>
  );
};

export default NavItem;
