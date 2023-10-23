// When clicking the change button I need to receive an Id of the item ----------- ok
// Create popup ------------------------------------------------------------------ ok
// Open popup where will be two fields header and description -------------------- ok
// There should be a placeholder whith the previous value for header and descr --- ok
// In the popup should be two btns Confirm and Cancel ---------------------------- ok
// After clicking Cancel btn the popup is closed and renaming didnt happen ------- ok
// After changing the field to new values and clicking confirm btn the renaming -- ok
//on the rendered card should happen
// For that i need two sates to collect the data, create PATCH request to the -----ok
//firebase and fetch and rerender task with new value

import React, { useState, useContext } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
  import Context from "../store/context.js";

const EditTextPopup = ({ openModal, toggle, name, description,id, 
  // onEdited
}) => {
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);

  const ctx = useContext(Context);
  
  const editHandler = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setEditName(value);
        console.log(editName);
        console.log(name);
      //   setIsValid(true);
    } else if(name === "description"){
      setEditDescription(value);
      console.log(name);
      //   setIsValid(true);
    }
  };

  const saveEditedTaskHandler = (e) => {
   
    updateTaskContent(editName, editDescription, id);
    ctx.setEdited(true);
      // onEdited(true);
    // console.log(id);
    // console.log("SUBMIT EDITING", e.target.value);
    toggle();

  };

  const updateTaskContent = async (newName, newDescr, id) => {
    try {
      const updateTask = await fetch(
        `https://todo-list-52df6-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ 'Name': newName, 'Description': newDescr }),
          headers: {
            "Contet-Type": "application/json",
          },
        }
      );
      console.log("working patch");
      if (!updateTask.ok) {
        throw new Error("Sorry, something went wrong!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal isOpen={openModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <ModalBody>
        <form autoComplete="off">
          <div className="form-group mb-3">
            <label className="form-label text-primary-emphasis">
              Task Name
            </label>
            <input
              type="text"
              className="form-control"
              //   className={`form-control ${!isValid && "is-invalid"}`}
              value={editName}
              name="taskName"
              onChange={editHandler}
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
              value={editDescription}
              name="description"
              onChange={editHandler}
            ></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={saveEditedTaskHandler}>
          Save changes
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTextPopup;
