import './Buttons.css'
import { useNavigate } from "react-router";
//assets


//login button
export function LoginButton(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login"); // Change to your route path
      };

    return(
        <button id="login" onClick={ handleClick } className="btn btn-soft btn-lg">Login</button>
    )
}

export function GetStarted() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/signup"); // Change to your route path
      };
    return (
        <button id="get-started" onClick={ handleClick } className="btn btn-neutral btn-xl">Get Started</button>
    );
  }  


export function DarkModeSwitch(){
  
    const setTheme = () =>  {
      const prev = document.documentElement.getAttribute("data-theme");
      if(prev == "emerald"){ document.documentElement.setAttribute("data-theme", "coffee"); }
      else { document.documentElement.setAttribute("data-theme", "emerald"); }
    }

    return (<label id = "dms" className="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input type="checkbox" onClick={ setTheme } className="toggle theme-controller" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>);
  }