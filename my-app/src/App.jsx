import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import supabase from "./helper/supabaseClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile";
import Navb from "./components/navbar";
import Leaderboard from "./components/leaderboard";
import Workouts from "./components/workouts";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is already signed in
      const { session, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching user session:", error);
        return;
      }
      setUser(session?.user ?? null);
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Navb />
        <div className="pt-16">
          {" "}
          {/* Adjust this padding as needed */}
          <Routes>
            {user ? (
              <Route path="/" element={<Navigate to="/home" replace />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recentWorkouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
