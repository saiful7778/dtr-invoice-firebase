import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/style.css";
import { RouterProvider } from "react-router-dom";
import route from "./routes/routes";
import StateComp from "./hooks/StateContext";
import AuthContext from "./hooks/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateComp>
      <AuthContext>
        <RouterProvider router={route} />
      </AuthContext>
    </StateComp>
  </React.StrictMode>,
);
