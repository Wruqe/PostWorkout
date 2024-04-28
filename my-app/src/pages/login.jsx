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
    <div>
      <div className="circle top-left-circle"></div>

      <Container fluid>
        <Row className="min-vh-100">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              <div className="mb-5">
                <h1 className="PostWorkout-Primary">
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
              <button className="Primary-Button" onClick={signInWithEmail}>
                login
              </button>
              <button className="Primary-Button" onClick={signUpNewUser}>
                signup
              </button>
              {authError && <p>{authError}</p>}
            </div>
          </Col>

          <Col md={6} className="p-0 position-relative">
            <img
              className="w-100 h-100 position-absolute"
              src={MikeMentzer}
              alt="Mike Mentzer"
              style={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
