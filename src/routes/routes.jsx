import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);

export default route;
