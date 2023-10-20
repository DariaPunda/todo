import React from "react";
import Card from "../../components/Card/Card";
import "./TaskList.css";

const TaskList = ({
  taskList,
  onDelete,
  onStatusChange,
  onFilter,
  onEdited,
}) => {
  const cardItem = taskList
    .filter((taskObj) => {
      if (onFilter === "all") {
        return true;
      } else {
        return taskObj.Status === onFilter;
      }
    })
    .map((taskObj) => {
      console.log(taskObj.Status);
      // console.log(onFilter)
      return (
        <div className="task-card" key={taskObj.id}>
          <Card
            name={taskObj.Name}
            description={taskObj.Description}
            status={taskObj.Status}
            id={taskObj.id}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onEdited={onEdited}
          />
        </div>
      );
    });

  return <div className="task-container">{cardItem}</div>;
};

export default TaskList;
