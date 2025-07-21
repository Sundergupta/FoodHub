import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignInPage from "./screens/signIn";
import SignUpPage from "./screens/signUp";
import ManuPage from "./screens/Manupage";
import AdminPanel from "./screens/AdminPanel";

// Define all your routes
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
