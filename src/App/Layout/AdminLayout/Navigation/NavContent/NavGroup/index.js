import React from "react";
import NavItem from "../NavItem";

const NavGroup = ({ group }) => {
  let navItems = "";
  if (group.children) {
    const groups = group.children;
    // it can also be groups.map(item => return item)
    navItems = Object.keys(groups).map((item) => {
      item = groups[item];
      switch (item.type) {
        case "collapse":
          return false;
        //return <NavCollapse key={item.id} collapse={item} type="main" />;
        case "item":
          return <NavItem key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }
  return navItems;
};

export default NavGroup;
