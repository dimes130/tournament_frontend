import { LoginForm } from "../../components/inputs/Input";

function Login() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LoginForm />
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Don't have an account? <a href="/signup" className="text-blue-600 underline hover:text-blue-700 font-medium">
  Sign up
</a>
        </p>  
      </div>
    </div>
  );
}

export default Login;
