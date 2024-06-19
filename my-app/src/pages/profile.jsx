import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
import Workouts from "../components/workouts";
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [picture, setPicture] = useState(null);
  // const [profileIcon, setProfileIcon] = useState(null);
  // const [blog, setblog] = useState({
  //   title: "",
  //   content: "",
  //   author: user?.username,
  // });

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

  // on click this will trigger the file upload to supbase
  // function uploadProfilePicture(profileIcon) {
  // const {data, error} = await supabase
  // .storage
  // .from("avatars")
  // .upload(`public/${profileIcon.name}`, profileIcon);
  // }

  // async function to create a blog
  // use this state to create a blog, with form inputs
  // The eq if for that speciiic user thats signed in
  // async function CreateBlog(){
  // const {
  //   title,
  //   content,
  //   author,
  // } = blog;

  // const {data, error} = await supabase
  // .from("blogs")
  // .insert(blog)
  // .eq("author", author);
  // }
  return (
    <div className="flex justify-start mt-4">
      {profileInfo && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
          <div>
            <div className="avatar flex flex col justify-center mb-2">
              <div className="w-24 rounded-full text-center">
                {picture && <img src={picture} />}
              </div>
            </div>
            <h2 className=" flex flex col justify-center mt-1 body-text">
              {profileInfo?.first_name} {profileInfo?.last_name}
            </h2>
            <h2 className="body-text">
              Athlete Type: {profileInfo?.athlete_type}
            </h2>
            <h2 className="body-text">Level 20</h2>

            <div>
              <progress
                className="progress progress-error w-56"
                value="70"
                max="100"
              ></progress>
            </div>
            <h1 className="body-text mt-3">Intro:</h1>
            <p className="flex flex col justify-center mb-2">
              {profileInfo?.bio}
            </p>
            <h1 className="body-text mt-3">Workout Goal Completetion:</h1>
            <div className="flex flex col justify-center">
              <div
                className="radial-progress bg-white 4 border-black"
                style={{ "--value": 70 }}
                role="progressbar"
              >
                70%
              </div>
            </div>
            <h1 className="body-text mt-2">Accolades</h1>
            <div>
              <p>Total Workouts Completed: </p>
              <p>Max Bench:</p>
              <p>Max Squat:</p>
              <p>Best Mile Time:</p>
              <p>Workout Streak:</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
