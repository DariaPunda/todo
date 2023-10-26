import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import "./TaskList.css";
import Context from "../../store/context.js";

const TaskList = ({ onFilter }) => {
  const ctx = useContext(Context);
  
  let content = <p  className="text-center">There is no tasks to do.</p>

  if (ctx.taskList.length > 0) {
    content = ctx.taskList.filter((taskObj) => {
      if (onFilter === "all") {
        return true;
      } else {
        return taskObj.Status === onFilter;
      }
    }).reverse().map((taskObj) => {
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
      })
  }

  if (ctx.error) {
    content = <p className=" error text-center fs-3 text-danger ">{ctx.error}</p>
  }
  
  if (ctx.loading) {
     content = <p className="loading text-center fs-4 text-primary">Loading...</p>
  }

  return <div className="task-container">{content}</div>;
  };

export default TaskList;
