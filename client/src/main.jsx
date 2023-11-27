import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from '../Routes/login';
import Signup from '../Routes/signup';
import Thoughts from '../Routes/thoughts';
import './style.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Thoughts />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
