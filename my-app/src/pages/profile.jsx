import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import '../css/profile.css'
import image from '../assets/MikeMenzter.png'
import { Link } from "react-router-dom"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimneyUser } from '@fortawesome/free-solid-svg-icons';

import "../App.css"; // Import CSS file for styling
import { Route, Router } from "react-router-dom";
import { NavLink } from "react-bootstrap";
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
    <>
   <div>
    <Link to='/home' classname = 'home-btn'>
    <FontAwesomeIcon icon={faHouseChimneyUser} className="homeicon"/>
    </Link>
    <div className="workouts">
    <h2 className="second-header">Recent Workouts:</h2>
    </div>
    </div>
    <div className="profile-pic">
    <img className= "mike-pic"src={image}></img>
    </div>
 <h3 className="level">level</h3>
    <div className="level-bar">
    </div>
    <div className="bio-stats">
      <h4 className="fourth-header">Bio Stats:</h4>
    </div>
    <button className="add-workout">add workout:</button>
    <div className="goals">
    <h5 className="fifth-header">Goals:</h5>
      <div className="goals-bar">
    </div>
    </div>
    <div className="blog-posts">
      <h5 className="blogs-header">Blogs:</h5>
      <button className="blogs-button">Create Blogs:</button>
    </div>

    </>
  )
  
  }
