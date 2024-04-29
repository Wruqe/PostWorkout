import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
export default function Home() {
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
    <div>
      <h1>Hello</h1>
    </div>
  )
  
    
}



