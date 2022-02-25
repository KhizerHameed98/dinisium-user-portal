import React, { Fragment } from "react";
import NavContent from "./NavContent";
import navigation from "../../../../menu-items";

const Navigation = () => {
  return (
    <Fragment>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu pb-5">
            <NavContent navigation={navigation.items} />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Navigation;
