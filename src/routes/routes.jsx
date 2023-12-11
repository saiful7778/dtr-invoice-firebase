import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Invoice from "../pages/Invoice";
import Login from "../pages/auth/Login";
import Reset from "../pages/auth/Reset";
import Register from "../pages/auth/Register";
import Terms from "../pages/info/Terms";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/user/Profile";

const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/manage",
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "terms_and_conditions",
        element: <Terms />,
      },
    ],
  },
]);

export default route;
