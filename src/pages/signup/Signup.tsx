import { SignUpForm } from "../../components/inputs/Input"; // Assuming SignUp is another component

function SignUp() {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh'
    }}>
      <SignUpForm/>
    </div>
  );
}

export default SignUp;
