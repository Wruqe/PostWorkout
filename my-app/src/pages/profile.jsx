import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import { Route, Router } from "react-router-dom";
export default function profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.log(error);
        }
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };
    fetchBlogs();
  }, []);


  return (
    <><button id="home-btn">
      Home
    </button>
    <div>
      <h1>Hello</h1>
    </div></>
  )
  
    
}



