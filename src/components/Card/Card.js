import React, { useState, useEffect, useReducer, useContext } from "react";
import CardFooter from "./CardFooter";
import EditTextPopup from "../../modals/EditTextPopup";
import Context from "../../store/context";
import "./Card.css";

const initialState = {
  textColor: "text-primary",
  bgColor: "text-bg-primary",
  borderColor: "border-primary",
};

const cardReducer = (state, action) => {
  if (action.type === "pause") {
    return {
      textColor: "text-warning",
      bgColor: "text-bg-warning",
      borderColor: "border-warning",
    };
  }
  if (action.type === "done") {
    return {
      textColor: "text-success",
      bgColor: "text-bg-success",
      borderColor: "border-success",
    };
  }

  if (action.type === "progress") {
    return {
      textColor: initialState.textColor,
      bgColor: initialState.bgColor,
      borderColor: initialState.borderColor,
    };
  }

  return state;
};

const Card = ({ name, description, id, removeTask, status }) => {

  const [statusState, dispatchStatus] = useReducer(cardReducer, initialState);
  const [statusChange, setStatusChange] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ctx = useContext(Context);

  const statusHandler = (newStatus) => {
    setStatusChange(newStatus);
    updateTaskStatus(newStatus, id);
  };

  const { textColor, bgColor, borderColor } = statusState;

  useEffect(() => {
    if (status === "pause") {
      dispatchStatus({ type: status });
    }
    if (statusChange === "pause") {
      dispatchStatus({ type: statusChange });
    }
    if (status === "done") {
      dispatchStatus({ type: status });
    }
    if (statusChange === "done") {
      dispatchStatus({ type: statusChange });
    }
    if (status === "progress") {
      dispatchStatus({ type: status });
    }
    if (statusChange === "progress") {
      dispatchStatus({ type: statusChange });
    }
  }, [status, statusChange]);

  const updateTaskStatus = async (status, id) => {
    try {
      const updateTask = await fetch(
        `https://todo-list-52df6-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ Status: status }),
          headers: {
            "Contet-Type": "application/json",
          },
        }
      );
      console.log("working patch");

      console.log(status);
      if (!updateTask.ok) {
        throw new Error("Sorry, something went wrong!");
      }
    } catch (error) {
      console.log(error.message);
    }
    ctx.setStatus(statusChange);
  };

  const editTextHandler = () => setIsVisible(true);

  const closeModal = () => setIsVisible(!isVisible);

  return (
    <div className={`${borderColor} card mb-3`}>
      <div className={`card-header ${bgColor} ${borderColor}`}>{name}</div>
      <div className={`card-body card-scroll ${textColor}`}>
        <p className="card-text">{description}</p>
      </div>
      <CardFooter
        statChange={statusHandler}
        borderColor={borderColor}
        id={id}
        removeTask={removeTask}
        editTextHandler={editTextHandler}
      />
      <EditTextPopup
        openModal={isVisible}
        toggle={closeModal}
        name={name}
        description={description}
        id={id}
      />
    </div>
  );
};

export default Card;
