import React, { useState } from "react";
import CreateTaskPopup from "../../modals/CreateTaskPopup";
import Button from "../Button";
import './TododList.css';

const ToDoList = () => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const openModalHandler = () => {
    setIsVisible(true);
  };
// text-bg-info  bg-success-subtle 
  return (
    <>
      <header className="header text-center">
        <h3 className="fs-1 text-white">Todo List</h3>
        <Button onClick={openModalHandler} className={" btn-success "}>
          Create Task
        </Button>
      </header>

      <CreateTaskPopup openModal={isVisible} toggle={closeModal} />
    </>
  );
};

export default ToDoList;
