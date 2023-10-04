import React from "react";
import Button from "../Button";
import TrashImg from "../../assets/TrashImg";
import ChangeIcon from "../../assets/ChangeIcon";

const CardFooter = ({statChange,borderColor}) => {

    const changeStatusHandler = (event) => {
        statChange(event.target.value);
    };


  return (
    <div className={ `${borderColor} card-footer card-container bg-transparent`}>
      <Button className="btn-outline-secondary">
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
            <li >
              <button onClick={changeStatusHandler} value='progress' className="dropdown-item btn-primary list-group-item-action list-group-item-primary">
                In Progress
              </button>
            </li>
            <li>
              <button onClick={changeStatusHandler} value='pause' className="dropdown-item btn-warning list-group-item-action list-group-item-warning">
                Paused
              </button>
            </li>
            <li>
              <button onClick={changeStatusHandler} value='done' className="dropdown-item btn-outline-success list-group-item-action list-group-item-success">
                Done
              </button>
            </li>
          </ul>
 
      </div>


      <Button className="btn-outline-danger">
        <TrashImg />
      </Button>
    </div>
  );
};

export default CardFooter;
