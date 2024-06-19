import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import Navb from "../components/navbar";
import { Navbar } from "react-bootstrap";
import Modal from "../components/modal";
export default function Home() {
  const [blogs, setBlogs] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
          setProfile(user);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      console.log("Profile:", profile);
      console.log("Profile ID:", profile.id);
      const fetchProfileInfo = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", profile.id)
            .single();
          if (error) {
            throw error;
          }

          console.log("Profile info fetched:", data);
          setProfileInfo(data);
        } catch (error) {
          console.error("Error fetching profile info:", error);
        }
      };

      fetchProfileInfo();
    }
  }, [profile]);

  useEffect(() => {
    console.log("fetching profile picture");
    console.log("profilePic", profileInfo?.image_url);

    if (profileInfo?.image_url) {
      const fetchProfilePicture = async () => {
        const { data, error } = await supabase.storage
          .from("profile_pictures")
          .download(profileInfo?.image_url);

        if (data) {
          const imageUrlObject = URL.createObjectURL(data);
          console.log("image url object", imageUrlObject);

          setPicture(imageUrlObject);
          console.log("picture", picture);
        }

        if (error) {
          console.log("error fetching profile picture", error);
        }
      };
      fetchProfilePicture();
    }
  }, [profileInfo]);

  return (
    <div className="ml-9">
      <div className="flex justify-start mt-4 h-full w-full">
        {profileInfo && (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
            <div>
              <div className="avatar flex flex-col items-center mb-2">
                <div className="w-24 rounded-full text-center">
                  {picture && <img src={picture} alt="Profile" />}
                </div>
              </div>
              <h2 className="flex flex-col justify-center mt-1 body-text items-center">
                {profileInfo?.first_name} {profileInfo?.last_name}
              </h2>
              <h2 className="body-text mt-5 mb-2">Your Workouts:</h2>
              <div className="space-y-4">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 body-text-white color"
                  >
                    <Modal buttonName={day} />
                  </div>
                ))}
              </div>
              <h1 className="body-text mt-3 mb-2">Workout Goal Completion:</h1>
              <div className="flex flex-col items-center">
                <div
                  className="radial-progress bg-white border-black text-center flex items-center justify-center body-text"
                  style={{ "--value": 70 }}
                  role="progressbar"
                >
                  70%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
