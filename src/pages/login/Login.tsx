import { SignUp } from "../../components/inputs/Input"; // Assuming SignUp is another component

function Login() {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh'
    }}>
      <SignUp/>
    </div>
  );
}

export default Login;
