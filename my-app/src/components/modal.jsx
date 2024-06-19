import React, { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ buttonName, closeButtonName }) => {
  const [modal, setModal] = useState(false);
  const [workouts, setWorkouts] = useState([{ type: "", formData: {} }]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleWorkoutChange = (index, event) => {
    const newWorkouts = [...workouts];
    newWorkouts[index].type = event.target.value;
    setWorkouts(newWorkouts);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkouts = [...workouts];
    newWorkouts[index].formData[name] = value;
    setWorkouts(newWorkouts);
  };

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { type: "", formData: {} }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send all workouts data to the database
    console.log("Workouts Data Submitted: ", workouts);
    // Example: axios.post('/api/workouts', workouts);
    toggleModal();
  };

  const renderExerciseFields = (index, exerciseName) => (
    <div className="mb-4" key={`${exerciseName}-${index}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {exerciseName}:
        <div className="flex space-x-2">
          <input
            type="text"
            name={`${exerciseName.toLowerCase()}Reps`}
            placeholder="Reps"
            value={
              workouts[index].formData[`${exerciseName.toLowerCase()}Reps`] ||
              ""
            }
            onChange={(e) => handleInputChange(index, e)}
            className="mt-1 block w-full bg-white text-black border border-black rounded-md p-2"
          />
          <input
            type="text"
            name={`${exerciseName.toLowerCase()}Sets`}
            placeholder="Sets"
            value={
              workouts[index].formData[`${exerciseName.toLowerCase()}Sets`] ||
              ""
            }
            onChange={(e) => handleInputChange(index, e)}
            className="mt-1 block w-full bg-white text-black border border-black rounded-md p-2"
          />
        </div>
      </label>
    </div>
  );

  const renderForm = (index) => {
    switch (workouts[index].type) {
      case "legDay":
        return (
          <>
            {renderExerciseFields(index, "Hamstrings")}
            {renderExerciseFields(index, "Quads")}
            {renderExerciseFields(index, "Calves")}
          </>
        );
      case "armDay":
        return (
          <>
            {renderExerciseFields(index, "Biceps")}
            {renderExerciseFields(index, "Triceps")}
          </>
        );
      case "chestDay":
        return renderExerciseFields(index, "Chest");
      case "backDay":
        return renderExerciseFields(index, "Back");
      default:
        return null;
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="btn ">
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
              {workouts.map((workout, index) => (
                <div key={index}>
                  <div className="mb-4">
                    <label
                      htmlFor={`workoutType-${index}`}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Select Workout Type:
                    </label>
                    <select
                      id={`workoutType-${index}`}
                      value={workout.type}
                      onChange={(e) => handleWorkoutChange(index, e)}
                      className="mt-1 block w-full bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500"
                    >
                      <option value="">Select</option>
                      <option value="legDay">Leg Day</option>
                      <option value="armDay">Arm Day</option>
                      <option value="chestDay">Chest Day</option>
                      <option value="backDay">Back Day</option>
                    </select>
                  </div>
                  <div className="workout-form">{renderForm(index)}</div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddWorkout}
                className="btn mt-4"
              >
                Add Another Workout
              </button>
              <div className="modal-action mt-4">
                <button type="submit" className="btn">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="btn ml-2 bg-gray-300 hover:bg-gray-400"
                >
                  Close
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
