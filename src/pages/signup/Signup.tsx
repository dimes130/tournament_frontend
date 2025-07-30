import { SignUpForm } from "../../components/inputs/Input"; // Assuming SignUp is another component

function SignUp() {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SignUpForm />
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Already have an account? <a href="/login" className="text-blue-600 underline hover:text-blue-700 font-medium">
        Login
      </a>
              </p>
      </div>
    </div>
  );
}

export default SignUp;
