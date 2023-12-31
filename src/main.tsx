import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './Pages/Register/index.tsx'
import { Login } from './Pages/Login/index.tsx'
import { Home } from './Pages/Home/index.tsx'
import { TableAccess } from "./Pages/TableAccess";
import { Tables } from "./Pages/AllTables/index.tsx";
import { MyCharacters } from './Pages/MyCharacters/index.tsx'
import { VerifyEmail } from './Pages/VerifyEmail/index.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/email-verification/verify/:email",
        element: <VerifyEmail />
      },
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/home-minhas-mesas",
        element: <Home />
      },
      {
        path: "/mesa/:id",
        element: <TableAccess />
      },
      {
        path: "/mesas",
        element: <Tables />
      },
      {
        path: "/procurar-mesas",
        element: <Tables />
      },
      {
        path: "/my-characters",
        element: <MyCharacters />
      }
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
