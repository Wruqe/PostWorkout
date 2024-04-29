import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import Navb from "../components/navbar";
import { Navbar } from "react-bootstrap";
import { Card } from 'react-bootstrap';
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

  const handleDayClick = (day) => {
    alert(`You clicked ${day}`);

  };
  return (
    <><div className="container mt-5">
      <Navb />
      {/* {blogs ? <Blog blogs={blogs} /> : <p>Loading blogs...</p>} */}
    </div>
    <Card style={{ width: '47rem', height: '22rem'}} >
    <Card.Body >
        <h1 className="body-text mt-5 text-center mb-4">Your Workouts:</h1>
        <div className="d-flex justify-content-between body-text h-50" style={{width: '700px', fontSize: '8px', cursor: 'pointer'}}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <Card key={day} onClick={() => handleDayClick(day)} >
              <Card.Body>{day}</Card.Body>
            </Card>
          ))}
        </div>
      </Card.Body>
    </Card>
    <div className="border p-4" style={{width: '47rem', height: '22rem'}}>
      <h1 className="body-text text-center">Motivation:</h1>
    </div>
  </>
  );
}
