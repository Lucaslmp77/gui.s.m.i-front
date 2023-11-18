import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './Pages/Register/index.tsx'
import { Login } from './Pages/Login/index.tsx'
import { Home } from './Pages/Home/index.tsx'
import {TableAccess} from "./Pages/TableAccess";
import {Tables} from "./Pages/AllTables/index.tsx";
import { Modifiers } from './components/modifiers/index.tsx'

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
        path: "/register",
        element: <Register/>
      },
      {
        path: "/home-minhas-mesas",
        element: <Home/>
      },
      {
        path: "/mesa/:id",
        element: <TableAccess/>
      },
      {
        path: "/mesas",
        element: <Tables/>
      },
      {
        path: "/procurar-mesas",
        element: <Tables/>
      },
      {
        path:"/modi",
        element: <Modifiers/>
      }
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
