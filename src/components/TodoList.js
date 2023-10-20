import React, { useState } from "react";
import CreateTaskPopup from "../modals/CreateTaskPopup";
import Button from "./Button";

const TodoList = ({ onPosted, onStatus }) => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const openModalHandler = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="header text-center primary-text-emphasis">
        <h3 className="fs-1 text-primary">Todo List</h3>
        <Button onClick={openModalHandler} className={" btn-primary "}>
          Create Task
        </Button>
      </div>

      <CreateTaskPopup
        openModal={isVisible}
        toggle={closeModal}
              onPosted={onPosted}
              onStatus={onStatus}
      />
    </>
  );
};

export default TodoList;
