import { combineReducers } from "redux";
import auth from "./auth";
import kyc from "./kyc";
import exchange from "./exchange";
import wallet from "./wallet";
import subscription from "./subscription";
import voting from "./voting";
import dashboard from "./dashboard";
import transfer from "./transfer";

export default combineReducers({
  auth,
  kyc,
  exchange,
  wallet,
  subscription,
  transfer,
  voting,
  dashboard,
});
