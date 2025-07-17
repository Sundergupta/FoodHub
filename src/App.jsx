import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import RootLayout from './component/RootLayout';
// import NavBar from './component/navBar';
import SignInPage from './screens/signIn';
import SignUpPage from './screens/signUp';
import ManuPage from './screens/Manupage';
const router = createBrowserRouter([

  // {
  //   path: '/',
  //   element: <NavBar />,
  // },
  {
    path: 'signIn',
    element: <SignInPage />,
  },
  {
    path: 'signUp',
    element: <SignUpPage />,
  },
  {
    path: 'ManuPage',
    element: <ManuPage />,
  }
])

function App() {
  // const user = useSelector((state) => state.user)
  // console.log("Inside App ", user)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
