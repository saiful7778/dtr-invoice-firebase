import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Invoice from "../pages/Invoice";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/invoice",
        element: <Invoice />,
      },
    ],
  },
]);

export default route;
