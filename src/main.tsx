import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.tsx'
import SignUp from './pages/signup/SignUp.tsx'
import { createBrowserRouter,  RouterProvider } from 'react-router'
import Login from './pages/Login/Login.tsx'
import { getLiveTheme } from './components/helper.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { CanvasPage } from './pages/Canvas/canvas.tsx'

//set theme based on local storage

getLiveTheme();

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/home", element: <Home/>},
  {path: "/signup", element: <SignUp/>},
  {path: "/login", element: <Login/>},
  {path: "/coach/:coach_id/dashboard", element: <Dashboard/>},
  {path: "/canvas", element: <CanvasPage/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = { router }/>
  </StrictMode>,
)
