import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './Pages/Login/index.tsx'
import { Register } from './Pages/Register/index.tsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/Register",
        element: <Register/>
      },
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
