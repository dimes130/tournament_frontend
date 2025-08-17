import './Input.css'
import { useRef, Fragment, useState } from "react";
import { calculateYearsDifference } from '../helper';
import { useNavigate } from 'react-router-dom';
import { CreatePlayRequest, CreatePlayProp, StartPlayButton } from '../buttons/Buttons';
import { PlayType } from '../../apis/Entities';

interface SignupProps {
    name: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

interface RoleProp{
  name: string;
  inputRef: React.RefObject<HTMLSelectElement | null>;
}


export function UsernameField({ name, inputRef }: SignupProps){
    return(
    <Fragment>
        <input type="username" placeholder= "Enter Username"
            className="input input-neutral"
            name = { name } 
            ref = { inputRef }/>
    </Fragment>
    );
    
}

export function PasswordField({ name, inputRef }: SignupProps){
    return (
                <Fragment>
                <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                <input type="password" name = { name } ref = { inputRef } required placeholder="Password" minLength={ 8 } pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                    </label>
                    <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br/>At least one number
                    <br/>At least one lowercase letter
                    <br/>At least one uppercase letter
                    </p>
                </Fragment>
    );
}

export function RoleInput({ name, inputRef }: RoleProp){

  return (
    <fieldset className="fieldset">
      <select 
        className="select"
        name = { name }
        ref = { inputRef }
        defaultValue={'Pick your Role'}
      >
        <option disabled={true}>Pick a Role</option>
        <option>Coach</option>
        <option>Player</option>
      </select>
    </fieldset>
  );
}

export function DOB({ name, inputRef }: SignupProps){
  return(
    <input type="date" className="input" name = {name} ref = { inputRef }/>
  );
}


export function SignUpForm(){
        const navigate = useNavigate();

        const usernameRef = useRef<HTMLInputElement | null>(null);
        const passwordRef = useRef<HTMLInputElement | null>(null);
        const roleRef = useRef<HTMLSelectElement | null>(null);
        const dobRef = useRef<HTMLInputElement | null>(null);

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          
          e.preventDefault();

          if (!dobRef.current) {
            console.error("Date of Birth input is not available.");
            return;
          }

          let dateTime = new Date();
          let dob = new Date(dobRef.current.value);
          const age = calculateYearsDifference(dob, dateTime);

          if (age < 18) {
            alert("You must be at least 18 years old to sign up.");
            return;
        }

          const formData = new FormData(e.currentTarget);
          const role = formData.get("role");
          const username = formData.get("username");
          const password = formData.get("password");


          const res = await fetch("http://localhost:8080/auth/signup",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({role, username, password})
          });
          
          const data = await res.json()

          if(res.ok){
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
      
            navigate(`/${data.role}/${data.id}/dashboard`);
          }

          else{
            console.log("error with login");
          }

        };


    return(
        <form onSubmit= { handleSubmit }>   

            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Sign Up</legend>
        
        {/* Role Input */}
        <label className="fieldset-label">Role</label>
        <RoleInput name = "role" inputRef={ roleRef }></RoleInput>

        {/* Date of Birth Input */}
        <label className="fieldset-label">Date of Birth</label>
        <DOB name = 'DOB' inputRef = { dobRef }></DOB>
        


        {/* Username Input */}
        <label className="fieldset-label">Username</label>
        <UsernameField name = "username" inputRef = {usernameRef} ></UsernameField>
        
        {/* Password Input */}
        <label className="fieldset-label">Password</label>
        <PasswordField name = "password" inputRef= { passwordRef }></PasswordField>
        
        <button type="submit" className="btn btn-neutral mt-4">Sign Up</button>
            </fieldset>
        </form>

        );
}


export function LoginForm(){
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("http://localhost:8080/auth/login",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    });
    
    const data = await res.json()
    console.log(data.id);
    if(res.ok){
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      navigate(`/${data.role}/${data.id}/dashboard`);
    }

    else{
      console.log("error with login");
    }

  };


return(
  <form onSubmit= { handleSubmit }>   

      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <legend className="fieldset-legend">Login</legend>
  
  {/* Username Input */}
  <label className="fieldset-label">Username</label>
  <UsernameField name = "username" inputRef = {usernameRef} ></UsernameField>
  
  {/* Password Input */}
  <label className="fieldset-label">Password</label>
  <PasswordField name = "password" inputRef= { passwordRef }></PasswordField>
  
  <button type="submit" className="btn btn-neutral mt-4">Login</button>
      </fieldset>
  </form>

  );
}

export function CreatePlayModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [playType, setPlayType] = useState<PlayType>("");

  return (
    <>
      {/* Open Modal Button */}
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Create Play
      </button>

      {/* Modal */}
      {isOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">New Play</h3>

            <div className="space-y-4">
              {/* Play Name */}
              <div>
                <label className="label">
                  <span className="label-text">Play Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter play name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Play Type */}
              <div>
                <label className="label">
                  <span className="label-text">Play Type</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={playType}
                  onChange={(e) => setPlayType(e.target.value as PlayType)}
                  required
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="OFFENSE">Offense</option>
                  <option value="DEFENSE">Defense</option>
                </select>
              </div>

              {/* Actions */}
              <div className="modal-action">
                <StartPlayButton
                  play={{
                    name,
                    playType,
                  }}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}