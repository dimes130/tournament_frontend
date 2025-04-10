import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.tsx'
import SignUp from './pages/signup/SignUp.tsx'
import { createBrowserRouter,  RouterProvider } from 'react-router'


const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/home", element: <Home/>},
  {path: "/signup", element: <SignUp/>}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = { router }/>
  </StrictMode>,
)
