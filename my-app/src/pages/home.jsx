import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import Navb from "../components/navbar";
export default function Home() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase.from("blogs").select("*");
        if (error) {
          console.log(error);
        }
        if (data) {
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <Navb />
      {blogs ? <Blog blogs={blogs} /> : <p>Loading blogs...</p>}
    </div>
  );
}
