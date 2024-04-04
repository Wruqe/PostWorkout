import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import supabase from './helper/supabaseClient';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is already signed in
      const { session, error } = await supabase.auth.session();
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
      <BrowserRouter>
        <Routes>
          {/* Redirect to home if user is logged in */}
          {user ? <Route path="/" element={<Navigate to="/home" replace />} /> : null}

          {/* Route for login */}
          <Route path="/" element={<Login />} />
          {/* Route for home */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
