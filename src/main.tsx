import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.tsx'
import Login from './pages/login/Login.tsx'
import { createBrowserRouter,  RouterProvider } from 'react-router'


const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/home", element: <Home/>},
  {path: "/login", element: <Login/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = { router }/>
  </StrictMode>,
)
