import React from "react";
import NavGroup from "./NavGroup";

const NavContent = ({ navigation }) => {
  const navItems = navigation.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} group={item} />;
      default:
        return false;
    }
  });

  return (
    <div className="nav">
      <div className="sb-sidenav-menu-heading"></div>
      {navItems}
    </div>
  );
};

export default NavContent;
