import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import profileIcon from "../assets/profile-icon.png";
import SearchBar from "./search";
import { Link } from 'react-router-dom';
export default function Navb() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand className="NavPW" href="#home">
          Post Workout
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <SearchBar />
          </Nav>
          <Nav>
            <Link className="nav-link body-text" to="/profile">
              My Profile <img className="Profile-Icon" src={profileIcon} alt="" />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
