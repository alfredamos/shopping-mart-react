import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.route";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbootstrap/css/mdb.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
