import React, { useState } from "react";
import "./CreateTask.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTaskPopup = ({ openModal, toggle, saveTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
      setIsValid(true);
    } else {
      setDescription(value);
      setIsValid(true);
    }
  };

  const submitTaskHandler = (e) => {
    e.preventDefault();
    if (taskName.length < 1) {
      setIsValid(false);

      // && description.length < 1
    } else {
      let task = {};
      task["Name"] = taskName;
      task["Description"] = description;
      
      saveTask(task);
      setTaskName("");
      setDescription("");
      setIsValid(true);
      toggle();
    }
  };

  return (
    <Modal isOpen={openModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group mb-3">
            <label className="form-label text-primary-emphasis">
              Task Name
            </label>
            <input
              type="text"
              className={`form-control ${!isValid && "is-invalid"}`}
              value={taskName}
              name="taskName"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="form-group mb-3">
            <label className="form-label text-primary-emphasis">
              Description
            </label>

            <textarea
              className="form-control"
              rows="5"
              resize="none"
              value={description}
              name="description"
              onChange={changeHandler}
            ></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitTaskHandler} type="submit">
          Create
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
