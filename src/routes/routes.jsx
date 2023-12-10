import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Invoice from "../pages/Invoice";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Terms from "../pages/info/Terms";

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
      {
        path: "/terms_and_conditions",
        element: <Terms />,
      },
    ],
  },
]);

export default route;
