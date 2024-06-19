import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import { Container, Row, Col } from "react-bootstrap";
import MikeMentzer from "../assets/MikeMenzter.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();

  const signUpNewUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      setAuthError(error.message);
    }
    console.log(data);
  };

  function SuccessLogin() {
    toast.success("Login Successful");
    navigate("/home");
  }

  const signInWithEmail = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (data) {
        SuccessLogin();
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div>
              <div className="mb-5">
                <h1 className="PostWorkout-Primary1">
                  Post <br />
                  Workout
                </h1>
              </div>
              <div className="mb-3">
                <p className="body-text">Email</p>
                <input
                  className="Input-login mb-3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p className="body-text">Password</p>
                <input
                  className="Input-login"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <button className="Primary-Button" onClick={signInWithEmail}>
                  login
                </button>
                <button className="Primary-Button" onClick={signUpNewUser}>
                  signup
                </button>
              </div>
              {authError && <p>{authError}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
