import { createBrowserRouter } from "react-router-dom";
import Analitycs from "../Pages/Analitycs/Analytics.jsx";
import Settings from "../Pages/Settings/Settings.jsx";
import Layout from "../Layouts/Layout.jsx";
import Dashboard from "../Pages/Dashboard/Dashboard.jsx";
import Auth from "../Pages/Auth/Auth.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/analitycs",
          element: <Analitycs />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "register",
      element: (
        <Auth
          title={"Create your profile"}
          subtitle={
            "Start your journey to healthy habits with us right now."
          }
          buttonText={"Create an account"}
          toggleText={"Already have an account?"}
          linkText={"Login"}
          passwordText={null}
          authAction={"register"}
        />
      ),
    },
    {
      path: "login",
      element: (
        <Auth
          title={"Welcome to the cloud!"}
          subtitle={
            "Log in to your account to continue your journey to healthy habits."
          }
          buttonText={"Login"}
          toggleText={"Don't have an account yet?"}
          linkText={"Register"}
          passwordText={"Forgot your password?"}
          authAction={"login"}
        />
      ),
    },
  ],
  { basename: "/habit-tracker" },
);
