import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Invoice from "../pages/Invoice";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default route;
