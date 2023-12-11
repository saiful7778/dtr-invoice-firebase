import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Invoice from "../pages/Invoice";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Terms from "../pages/info/Terms";
import Reset from "../pages/auth/Reset";

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
        path: "/account",
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
        ],
      },

      {
        path: "/terms_and_conditions",
        element: <Terms />,
      },
    ],
  },
]);

export default route;
