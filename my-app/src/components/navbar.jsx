import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import supabase from "../helper/supabaseClient";
import SearchBar from "./search";

export default function Navb() {
  const [profile, setProfile] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (profile?.id) {
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
          setProfileInfo(data);
        } catch (error) {
          console.error("Error fetching profile info:", error);
        }
      };
      fetchProfileInfo();
    }
  }, [profile]);

  useEffect(() => {
    if (profileInfo?.image_url) {
      const fetchProfilePicture = async () => {
        try {
          const { data, error } = await supabase.storage
            .from("profile_pictures")
            .download(profileInfo.image_url);
          if (error) {
            throw error;
          }
          const imageUrlObject = URL.createObjectURL(data);
          setPicture(imageUrlObject);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };
      fetchProfilePicture();
    }
  }, [profileInfo]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand className="NavPW" href="/home">
          Post Workout
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <SearchBar />
          </Nav>
          <Nav.Link className="body-text" href="/leaderboard">
            <div className="mr-20">Leaderboards</div>
          </Nav.Link>
          <Nav.Link className="body-text" href="/profile">
            <div className="flex items-center justify-center avatar">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {picture && <img src={picture} alt="Profile" />}
                </div>
              </div>
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
