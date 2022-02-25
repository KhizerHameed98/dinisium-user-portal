import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import browserRoute from "../Constants/browserRoutes";
import routes from "../Routes/authRoutes";
import PrivateRoute from "../hoc/privateRoute";
import SignInComponent from "../Components/Authentication/SignIn/index";
// import Loadable from "react-loadable";
import Aux from "../hoc/_Aux";
import Loader from "./Layout/Loader";
import AdminLayout from "./Layout/AdminLayout";
import "./Assets/css/new-style.css";
import "./Assets/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const AdminLayout = Loadable({
//   loader: () => "./layout/AdminLayout",
//   loading: Loader,
// });

export const SideNavToggleContext = React.createContext();

const App = () => {
  const [sideNavToggle, setSideNavToggle] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector(
    (state) => state.auth.userDetails.role && state.auth.userDetails.role
  );
  const isBlocked = useSelector(
    (state) =>
      state.auth.userDetails.is_blocked && state.auth.userDetails.is_blocked
  );

  const token = localStorage.getItem("token");
  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      document.title = "Auth | Dinisium";
    } else {
      document.title = "Dinisium";
    }
  }, [isAuthenticated]);

  return (
    <Aux>
      {/* <ToastContainer
        autoClose={3000} position="top-left" /> */}

      <Suspense fallback={<Loader />}>
        <SideNavToggleContext.Provider
          value={{ sideNavToggle, setSideNavToggle }}
        >
          <Switch>
            <Route
              path={browserRoute.SIGNIN}
              exact
              render={(props) =>
                (isAuthenticated || (token && token !== "undefined")) &&
                  userRole === "user" &&
                  !isBlocked ? (
                  <Redirect
                    to={{
                      pathname: browserRoute.DASHBOARD,
                    }}
                  />
                ) : (
                  <SignInComponent {...props} />
                )
              }
            />
            {menu}
            <Route
              path="/"
              exact
              render={(props) =>
                (isAuthenticated || (token && token !== "undefined")) &&
                  userRole === "user" &&
                  !isBlocked ? (
                  <Redirect
                    to={{
                      pathname: browserRoute.DASHBOARD,
                    }}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: browserRoute.SIGNIN,
                    }}
                  />
                )
              }
            />
            <PrivateRoute
              path={browserRoute.INVESTOR_ROUTE}
              component={AdminLayout}
            />
          </Switch>
        </SideNavToggleContext.Provider>
      </Suspense>
    </Aux>
  );
};

export default App;
