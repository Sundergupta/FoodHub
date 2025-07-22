import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignInPage from "./screens/signIn";
import SignUpPage from "./screens/signUp";
import ManuPage from "./screens/Manupage";
import AdminPanel from "./screens/AdminPanel";
import ProfilePage from "./screens/ProfilePage"; // ✅ import profile

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
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
    element: <ManuPage />,
  },
  {
    path: "/adminPanel",
    element: <AdminPanel />,
  },
  {
    path: "/profile", // ✅ new route
    element: <ProfilePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
