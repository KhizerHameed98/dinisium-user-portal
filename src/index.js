import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./App/Assets/css/new-style.css";
import "./App/Assets/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import AppIndex from "./App/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dotenv from "dotenv";

import { Provider } from "react-redux";
import { store } from "./Redux/store/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUserWallet, loadUser } from "./Redux/actions/actions";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  dotenv.config();
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadUserWallet());
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} position="top-right" />
      <Provider store={store}>
        <BrowserRouter>
          <AppIndex />
        </BrowserRouter>
      </Provider>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
