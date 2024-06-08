import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import Navb from "../components/navbar";
import { Navbar } from "react-bootstrap";
export default function Home() {
  const [blogs, setBlogs] = useState(null);

  const [workout, setWorkout] = useState({
    title: "",
    workout: "",
    user_id: "",
    repittions: "",
    sets: "",
    weight: "",
  });

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

  // Create a workout entry for current user signed in

  // get all workouts for the current user signed in

  async function getWorkouts() {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", supabase.auth.user()?.id);

    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
    }
  }

  return (
    <div className="container mt-5">
      <Navb />
      {/* {blogs ? <Blog blogs={blogs} /> : <p>Loading blogs...</p>} */}
    </div>
  );
}
