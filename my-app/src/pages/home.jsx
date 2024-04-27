import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import Navb from "../components/navbar";
import { Navbar } from "react-bootstrap";
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
    <div className="container mt-5">
      <Navb />
      {/* {blogs ? <Blog blogs={blogs} /> : <p>Loading blogs...</p>} */}
    </div>
  );
}
