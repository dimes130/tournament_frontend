import './Input.css'
import { useRef, Fragment } from "react";
import { calculateYearsDifference } from '../helper';


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
      <legend className="fieldset-legend">What is your role?</legend>
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


export function SignUp(){

        const usernameRef = useRef<HTMLInputElement | null>(null);
        const passwordRef = useRef<HTMLInputElement | null>(null);
        const roleRef = useRef<HTMLSelectElement | null>(null);
        const dobRef = useRef<HTMLInputElement | null>(null);

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          
          e.preventDefault();

          //
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

          formData.append('age', String(age));

          console.log([...formData.entries()]);

        };


    return(
        <form onSubmit= { handleSubmit }>   

            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>
        
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