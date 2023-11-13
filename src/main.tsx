import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './Pages/Register/index.tsx'
import { Login } from './Pages/Login/index.tsx'
import { Home } from './Pages/Home/index.tsx'
import {CreateTable} from "./Pages/Table/createTable.tsx";
import {Table} from "./Pages/Table/table.tsx";
import { Roulette } from './components/roulette/index.tsx'

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
      {
        path: "/Home",
        element: <Home/>
      },
      {
        path: "/criar-mesa",
        element: <CreateTable/>
      },
      {
        path: "/mesa",
        element: <Table/>
      },
      {
        path: "/dice",
        element: <Roulette/>
      }
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
