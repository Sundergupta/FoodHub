import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import SignInPage from "./screens/signIn";
import SignUpPage from "./screens/signUp";
import ManuPage from "./screens/ManuPage";
import AdminPanel from "./screens/AdminPanel";
import ProfilePage from "./screens/ProfilePage";

// 🔒 Protected Route wrapper
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("user"); // Simple login check
  return isLoggedIn ? element : <Navigate to="/signIn" replace />;
};

// 🌐 App routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signUp" replace />, // Default route
  },
  {
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/menu",
    element: <ProtectedRoute element={<ManuPage />} />,
  },
  {
    path: "/adminPanel",
    element: <ProtectedRoute element={<AdminPanel />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute element={<ProfilePage />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
