import React, { useState, useContext } from "react";
import Button from "../Button";
import TrashImg from "../../assets/TrashImg";
import ChangeIcon from "../../assets/ChangeIcon";
import OnDeletePopup from "../../modals/OnDeletePopup";
import Context from "../../store/context";

const CardFooter = ({ statChange, borderColor, id, editTextHandler }) => {
  const [visible, setVisible] = useState(false);

  const ctx = useContext(Context);

  const onDismiss = () => setVisible(!visible);

  const deleteCardHandler = () => setVisible(true);

  const changeStatusHandler = (event) => statChange(event.target.value);

  const removeTask = async (id) => {
    try {
      const deleteTask = await fetch(
        `https://todo-list-52df6-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!deleteTask.ok) {
        throw new Error("Sorry, something went wrong!");
      }
      ctx.setDeleted(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`${borderColor} card-footer card-container bg-transparent`}
      id={id}
    >
      <Button
        className="btn-outline-secondary"
        onClick={editTextHandler}
        id={id}
      >
        <ChangeIcon />
      </Button>

      <div className="dropdown" role="group">
        <button
          type="button"
          className="btn btn-outline-primary dropdown-toggle "
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Move to...
        </button>

        <ul className="dropdown-menu ">
          <li>
            <button
              onClick={changeStatusHandler}
              value="progress"
              className="dropdown-item btn-outline-primary list-group-item-action list-group-item-primary"
            >
              In Progress
            </button>
          </li>
          <li>
            <button
              onClick={changeStatusHandler}
              value="pause"
              className="dropdown-item btn-outline-warning list-group-item-action list-group-item-warning"
            >
              Paused
            </button>
          </li>
          <li>
            <button
              onClick={changeStatusHandler}
              value="done"
              className="dropdown-item btn-outline-success list-group-item-action list-group-item-success"
            >
              Done
            </button>
          </li>
        </ul>
      </div>

      <Button
        className="btn-outline-danger"
        id={id}
        onClick={deleteCardHandler}
      >
        <TrashImg />
      </Button>
      <OnDeletePopup
        openModal={visible}
        id={id}
        toggle={onDismiss}
        removeTask={removeTask}
      ></OnDeletePopup>
    </div>
  );
};

export default CardFooter;
