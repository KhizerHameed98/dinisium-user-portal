import React from "react";
import Route from "../Constants/browserRoutes";

const SignIn = React.lazy(() => import("../Components/Authentication/SignIn"));

const ResetPassword = React.lazy(() =>
  import("../Components/Authentication/ResetPassword/index")
);

const ForgotPassword = React.lazy(() =>
  import("../Components/Authentication/ForgotPassword/index")
);

const SignUp = React.lazy(() =>
  import("../Components/Authentication/SignUp/index")
);

const TestPage = React.lazy(() =>
  import("../Components/Authentication/VerifyEmail/index")
);

const authRoutes = [
  {
    path: Route.VERIFY_EMAIL,
    exact: true,
    name: "test",
    component: TestPage,
  },

  {
    path: Route.SIGNIN,
    exact: true,
    name: "SignIn",
    component: SignIn,
  },
  {
    path: Route.SIGNUP,
    exact: true,
    name: "SignUp",
    component: SignUp,
  },
  {
    path: Route.FORGOT_PASSWORD,
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: Route.RESET_PASSWORD,
    exact: true,
    name: "ResetPassword",
    component: ResetPassword,
  },
];

export default authRoutes;
