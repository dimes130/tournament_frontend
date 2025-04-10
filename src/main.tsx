import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.tsx'
import SignUp from './pages/signup/SignUp.tsx'
import { createBrowserRouter,  RouterProvider } from 'react-router'
import Login from './pages/Login/Login.tsx'

document.documentElement.setAttribute("data-theme", "emerald");

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/home", element: <Home/>},
  {path: "/signup", element: <SignUp/>},
  {path: "/login", element: <Login/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = { router }/>
  </StrictMode>,
)
