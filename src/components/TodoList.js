import React, { useState } from "react";
import CreateTaskPopup from "../modals/CreateTaskPopup";
import Button from "./Button";
// import Card from "../components/Card/Card";
import "./TodoList.css";
// import Filter from "./Filter/Filter";

const TodoList = ({saveTask}) => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(!isVisible);
    console.log("closing works");
  };
  const openModalHandler = () => {
    setIsVisible(true);
    console.log("opening works");
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
        saveTask={saveTask}
      />
    </>
  );
};

export default TodoList;
