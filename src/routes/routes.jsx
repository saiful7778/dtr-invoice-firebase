import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Invoice from "../pages/Invoice";
import Login from "../pages/auth/Login";
import Reset from "../pages/auth/Reset";
import Register from "../pages/auth/Register";
import Terms from "../pages/info/Terms";
import Dashboard from "../pages/Dashboard";

const route = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
  {
    path: "/manage",
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
