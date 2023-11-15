import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './Pages/Register/index.tsx'
import { Login } from './Pages/Login/index.tsx'
import { Home } from './Pages/Home/index.tsx'
import { CreateTable } from "./Pages/Table";
import { TableAccess } from "./Pages/TableAccess";
import { Tables } from "./Pages/Table/tables.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/home-minhas-mesas",
        element: <Home />
      },
      {
        path: "/criar-mesa",
        element: <CreateTable />
      },
      {
        path: "/table-access/:id",
        element: <TableAccess />
      },
      {
        path: "/mesas",
        element: <Tables />
      }
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
