import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import Navb from "../components/navbar";
import { Card, Modal, Button } from 'react-bootstrap';

export default function Home() {
  const [blogs, setBlogs] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // State to track selected day
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

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
    setSelectedDay(day);
    setShowModal(true); // Show modal when a day is clicked
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
    setShowModal(false); // Hide modal when close button is clicked
  };

  return (
    <>
      <div className="container mt-5">
        <Navb />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add modal body content here */}
          Your modal content goes here.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Card style={{ width: '47rem', height: '22rem', margin: 'auto', marginTop: '20px', marginLeft: '5px'}}>
        <Card.Body >
          <h1 className="body-text mt-5 text-center mb-4">Your Workouts:</h1>
          <div className="d-flex justify-content-between body-text h-50" style={{width: '700px', fontSize: '8px', cursor: 'pointer'}}>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <Card key={day} onClick={() => handleDayClick(day)}>
                <Card.Body>{day}</Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>

      <div className="border p-4" style={{width: '47rem', height: '22rem', margin: 'auto', marginTop: '20px', marginLeft: '5px'}}>
        <h1 className="body-text text-center">Motivation:</h1>
      </div>
    </>
  );
}
