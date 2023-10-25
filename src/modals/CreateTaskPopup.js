import React, { useState, useContext } from "react";
import "./CreateTask.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Context from "../store/context.js";

const CreateTaskPopup = ({ openModal, toggle }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);

  const ctx = useContext(Context);
 
  const postTask = async (task) => {
    try {
      const sendTask = await fetch(
        "https://todo-list-52df6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Contet-Type": "application/json",
          },
        }
      );
      if (!sendTask.ok) {
        throw new Error("Oops, something went wrong!");
      }
      ctx.setPosted(true);
    } catch (error) {
      // message = "Oops, something went wrong!";
      console.log(error.message);
      
    }
  };

  // console.log(message);
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
    if (taskName.length < 1) {
      setIsValid(false);
      console.log(isValid);
    } else {
      let task = {};
      task["Name"] = taskName;
      task["Description"] = description;
      task["Status"] = ctx.status;
      postTask(task);
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
        <form autoComplete="off">
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
        <Button color="primary" onClick={submitTaskHandler}>
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
