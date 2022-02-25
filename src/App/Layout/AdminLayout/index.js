import React, { Suspense, useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Navigation from "./Navigation";
import routes from "../../../Routes/pagesRoutes";
import { Redirect, Route, Switch } from "react-router-dom";
import browserRoutes from "../../../Constants/browserRoutes";
import PrivateRoute from "../../../hoc/privateRoute";
import Loader from "../Loader";
import Footer from "./Footer";
import BreadCrumb from "./BreadCrumb";
import PageTitle from "./PageTitle";
import { SideNavToggleContext } from "../../index";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);

  const [sideNavToggleValue, setSideNavToggleValue] = useState("");

  const sideNavToggleContext = useContext(SideNavToggleContext);
  const { sideNavToggle } = sideNavToggleContext;

  useEffect(() => {
    if (sideNavToggle) setSideNavToggleValue("sb-sidenav-toggled");
    else setSideNavToggleValue("");
  }, [sideNavToggle]);

  //Routes if KYC is approved
  //Show all Routes if KYC is approved
  const menu = routes.map((route, index) => {
    return route.component &&
      userDetails &&
      userDetails.kyc_status &&
      userDetails.kyc_status === "approved" ? (
      <PrivateRoute
        key={index}
        exact={route.exact}
        path={route.path}
        name={route.name}
        component={route.component}
      />
    ) : null;
  });

  // Showable routes if kyc is not approved
  // Find investor Routes where kyc_status is not approved or null yet
  let showableKycRoutes =
    userDetails &&
    userDetails.kyc_status !== "approved" &&
    routes &&
    routes.length > 0 &&
    routes.filter((route) => route.approvedkyc === "not-mandatory");

  const nonApprovedKycMenu =
    showableKycRoutes &&
    showableKycRoutes.length > 0 &&
    showableKycRoutes.map((route, index) => {
      return route.component &&
        userDetails &&
        userDetails.kyc_status !== "approved" ? (
        <PrivateRoute
          key={index}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
        />
      ) : null;
    });

  // Not Showable routes if kyc is not approved
  // Find investor Routes where kyc_status is not approved or null yet and approvedkyc property in routes is mandatory
  let notShowableKycRoutes =
    userDetails &&
    userDetails.kyc_status !== "approved" &&
    routes &&
    routes.length > 0 &&
    routes.filter((route) => route.approvedkyc === "mandatory");

  const nonApprovedKycText =
    notShowableKycRoutes &&
    notShowableKycRoutes.length > 0 &&
    notShowableKycRoutes.map((route, index) => {
      return route.component &&
        userDetails &&
        userDetails.kyc_status !== "approved" ? (
        <div className="col-md-12">
          <h3 style={{ color: "red", textAlign: "center" }}>
            Your KYC is not Approved yet
          </h3>
        </div>
      ) : null;
    });

  return (
    <div className={`sb-nav-fixed ${sideNavToggleValue}`}>
      <NavBar />
      <div id="layoutSidenav">
        <Navigation />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <BreadCrumb />

              <div className="row">
                <PageTitle />

                <Suspense fallback={<Loader />}>
                  <Switch>
                    {menu}
                    {nonApprovedKycMenu}
                    {nonApprovedKycText}
                    {/* <Redirect from="/" to={browserRoutes.LOGGEDIN_DEFAULT} /> */}
                  </Switch>
                </Suspense>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
