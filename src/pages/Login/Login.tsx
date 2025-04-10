import { LoginForm } from "../../components/inputs/Input";

function Login(){
    return (
        <div style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '75vh'
        }}>
          <LoginForm/>
        </div>
      );
}

export default Login;