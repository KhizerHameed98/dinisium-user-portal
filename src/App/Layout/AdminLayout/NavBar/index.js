import React from "react";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const NavBar = () => {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-white shadow py-3">
      <NavLeft />
      <NavRight />
    </nav>
  );
};

export default NavBar;
