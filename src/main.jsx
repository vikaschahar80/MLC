import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import './i18n';
// This line is essential. The error "createBrowserRouter is not defined"
// happens if this import is missing or incorrect.
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Import your components
import Root from "./routes/root";
import LoginPage from "./login/page"; 
import { ProtectedRoute } from "./components/ProtectedRoute"; 
import AuthLayout from "./routes/AuthLayout"; // The layout that provides the context

// Import your page components
import StudentManagement from "./Pages/Student_Management/StudentManagement";
import Add from "./Pages/Student_Management/Add";
import Edit from "./Pages/Student_Management/Edit";
import Reports from "./Pages/Student_Management/Reports";
import Promote from "./Pages/Student_Management/Promote";

// 2. Define your application's routes with the new, corrected structure
const router = createBrowserRouter([
  {
    // AuthLayout is now the absolute root for ALL routes.
    // It provides the AuthContext to every page.
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />, // Now a child of AuthLayout, so it can use the context.
      },
      {
        // The Root component and its children are protected
        path: "/",
        element: (
          <ProtectedRoute>
            <Root />
          </ProtectedRoute>
        ),
        // These children will render inside Root's <Outlet />
        children: [
          {
            path: "student",
            element: <StudentManagement />,
          },
          {
            path: "student/add",
            element: <Add />,
          },
          {
            path: "student/edit",
            element: <Edit />,
          },
          {
            path: "student/reports",
            element: <Reports />,
          },
          {
            path: "student/promote",
            element: <Promote />,
          },
        ]
      }
    ]
  },
]);

// 3. Render the app without any providers here
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);
