import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import Root from "./routes/root";
import AddStudent from "./routes/AddStudent";
import EditStudent from "./routes/EditStudent";
import ViewReports from "./routes/ViewReports";
import PromoteStudents from "./routes/PromoteStudents";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,  
    children: [
      { path: "add-student", element: <AddStudent /> },
      { path: "edit-student", element: <EditStudent /> },
      { path: "view-reports", element: <ViewReports /> },
      { path: "promote", element: <PromoteStudents /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
