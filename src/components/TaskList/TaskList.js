import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import "./TaskList.css";
import Context from "../../store/context.js";

const TaskList = ({ onFilter }) => {
  const ctx = useContext(Context);
  const cardItem = ctx.taskList
    .filter((taskObj) => {
      if (onFilter === "all") {
        return true;
      } else {
        return taskObj.Status === onFilter;
      }
    })
    .map((taskObj) => {
      console.log(taskObj.Status);
      return (
        <div className="task-card" key={taskObj.id}>
          <Card
            name={taskObj.Name}
            description={taskObj.Description}
            status={taskObj.Status}
            id={taskObj.id}
          />
        </div>
      );
    });

  return <div className="task-container">{cardItem}</div>;
};

export default TaskList;
