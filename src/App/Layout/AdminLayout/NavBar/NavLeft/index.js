import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Route from "../../../../../Constants/browserRoutes";
import logo from "../../../../Assets/images/danisium-logo.png";
import { SideNavToggleContext } from "../../../../index";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../../../Services/authServices";
import axios from "axios";
import { wallet } from "../../../../../Routes/serverRoutes";
import { LOGIN_FAIL } from "../../../../../Redux/actions/types";
import { toast } from "react-toastify";

const NavLeft = () => {
  const alertToast = (error, message) => {
    if (!error) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isBlocked = useSelector((state) => state?.auth?.userDetails?.is_blocked);

  console.log("is", isBlocked);

  const [ress, setRess] = useState([]);

  const getApi = async () => {
    try {
      const data = await axios.get(wallet.GET_TOKEN_LIST);
      setRess(data.status);
    } catch (err) {
      setRess(err?.response?.status);
      // alertToast(true, "You have been blocked by the admin");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getApi();
    if (ress === 403) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  });

  const sideNavToggleContext = useContext(SideNavToggleContext);
  const { sideNavToggle, setSideNavToggle } = sideNavToggleContext;

  const onClickSideNavBtn = (e) => {
    e.preventDefault();
    setSideNavToggle(!sideNavToggle);
  };

  return (
    <Fragment>
      <Link className="navbar-brand" to={Route.DASHBOARD}>
        <img className="main-logo" src={logo} alt="Logo" />
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 text-dark"
        id="sidebarToggle"
        onClick={onClickSideNavBtn}
      >
        <i className="fas fa-bars"></i>
      </button>
    </Fragment>
  );
};

export default NavLeft;
