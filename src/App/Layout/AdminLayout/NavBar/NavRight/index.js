import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Route from "../../../../../Constants/browserRoutes";
import { withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  logout,
  getWalletDetails,
  getTokens,
} from "../../../../../Redux/actions/actions";
import browserRoute from "../../../../../Constants/browserRoutes";

const NavRight = ({ auth: { userWallet, userDetails }, logout, history }) => {
  // const [accountAddress, setAccountAddress] = useState("");
  const [addressCopied, setAddressCopied] = useState(false);

  const Tokens = useSelector((state) => state?.wallet?.TokensListt?.sum);
  const userWalletFiatBalance = (userWallet) => {
    return userWallet?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fiatBalance = userWalletFiatBalance(
    userWallet?.fiat_balances?.toFixed(2)
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(history);
  };

  useEffect(() => {
    dispatch(getWalletDetails());
    dispatch(getTokens());
  }, [userWallet?.fiat_balances]);

  return (
    <Fragment>
      <ul className="top-bar-assest ml-auto mr-5 mb-0">
        <li>
          Asset Holding
          <span>{Tokens || "0"}</span>
        </li>
        <li>
          Balance Holding
          <span>{userWallet?.fiat_balances ? `$${fiatBalance}` : "$0"}</span>
        </li>
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle text-dark"
            id="userDropdown"
            // to={Route.BLANK_LINK}
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-cog"></i>
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="userDropdown"
          >
            <div
              className="dropdown-item"
              style={{ color: "blue", fontSize: "15px", fontWeight: "bold" }}
            >
              {userDetails?.fname + " " + userDetails?.lname || ""}
            </div>
            <div className="dropdown-divider"></div>
            <button
              className="dropdown-item"
              onClick={() => history.push(browserRoute.PROFILE)}
            >
              Profile
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </li>
      </ul>
      <ul className="mt-4 my-1 font-weight-bold">
        <p>Role: Investor</p>
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state?.auth,
});
export default connect(mapStateToProps, { logout })(withRouter(NavRight));
