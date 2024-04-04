import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming you have supabase initialized and accessible in the file
import supabase from '../helper/supabaseClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate(); // Initialize useHistory hook

  const signUpNewUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      // Handle success if needed
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const signInWithEmail = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Redirect to home after successful sign-in
      navigate('/home');
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Handle success if needed
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <div>
      {authError && <p>{authError}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={signUpNewUser}>Sign Up</button>
      <button onClick={signInWithEmail}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Login;
