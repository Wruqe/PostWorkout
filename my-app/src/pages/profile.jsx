import Blog from "../components/blog";
import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import "../App.css"; // Import CSS file for styling
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);

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
    <div>
      {profileInfo && (
        <>
          <h1 className="text-center">Welcome to Post Workout</h1>
          <h2 className="text-center">
            Hello {profileInfo?.first_name} {profileInfo?.last_name}
          </h2>
        </>
      )}
    </div>
  );
}
