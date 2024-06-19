import React, { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ buttonName, closeButtonName }) => {
  const [modal, setModal] = useState(false);
  const [selectedWorkoutTypes, setSelectedWorkoutTypes] = useState([]);
  const [formData, setFormData] = useState({});

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleWorkoutTypeChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedWorkoutTypes(selectedOptions);
    const newFormData = { ...formData };
    selectedOptions.forEach((type) => {
      if (!newFormData[type]) {
        newFormData[type] = {};
      }
    });
    setFormData(newFormData);
  };

  const handleInputChange = (workoutType, e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [workoutType]: {
        ...formData[workoutType],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to the database
    console.log("Workouts Data Submitted: ", formData);
    // Example: axios.post('/api/workouts', formData);
    toggleModal();
  };

  const renderExerciseFields = (workoutType, exerciseName) => (
    <div className="mb-4" key={`${workoutType}-${exerciseName}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {exerciseName}:
        <div className="flex space-x-2">
          <input
            type="text"
            name={`${exerciseName.toLowerCase()}Reps`}
            placeholder="Reps"
            value={
              formData[workoutType]?.[`${exerciseName.toLowerCase()}Reps`] || ""
            }
            onChange={(e) => handleInputChange(workoutType, e)}
            className="mt-1 block w-full bg-white text-black border border-black rounded-md p-2"
          />
          <input
            type="text"
            name={`${exerciseName.toLowerCase()}Sets`}
            placeholder="Sets"
            value={
              formData[workoutType]?.[`${exerciseName.toLowerCase()}Sets`] || ""
            }
            onChange={(e) => handleInputChange(workoutType, e)}
            className="mt-1 block w-full bg-white text-black border border-black rounded-md p-2"
          />
        </div>
      </label>
    </div>
  );

  const renderForm = (workoutType) => {
    switch (workoutType) {
      case "legDay":
        return (
          <div key="legDay">
            {renderExerciseFields(workoutType, "Hamstrings")}
            {renderExerciseFields(workoutType, "Quads")}
            {renderExerciseFields(workoutType, "Calves")}
          </div>
        );
      case "armDay":
        return (
          <div key="armDay">
            {renderExerciseFields(workoutType, "Biceps")}
            {renderExerciseFields(workoutType, "Triceps")}
          </div>
        );
      case "chestDay":
        return (
          <div key="chestDay">{renderExerciseFields(workoutType, "Chest")}</div>
        );
      case "backDay":
        return (
          <div key="backDay">{renderExerciseFields(workoutType, "Back")}</div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="btn btn-primary">
        {buttonName}
      </button>

      {modal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={toggleModal}
            >
              &times;
            </button>
            <h3 className="font-bold text-lg text-black">Your Workout</h3>
            <p className="py-4 text-black">Fill in Your Workout for today!</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="workoutType"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Select Workout Types:
                </label>
                <select
                  id="workoutType"
                  multiple
                  value={selectedWorkoutTypes}
                  onChange={handleWorkoutTypeChange}
                  className="mt-1 block w-full bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500"
                >
                  <option value="legDay">Leg Day</option>
                  <option value="armDay">Arm Day</option>
                  <option value="chestDay">Chest Day</option>
                  <option value="backDay">Back Day</option>
                </select>
              </div>
              <div className="workout-form">
                {selectedWorkoutTypes.map((workoutType) =>
                  renderForm(workoutType)
                )}
              </div>
              <div className="modal-action mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="btn btn-secondary ml-2"
                >
                  {closeButtonName}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  buttonName: PropTypes.string.isRequired,
  closeButtonName: PropTypes.string.isRequired,
};

export default Modal;
