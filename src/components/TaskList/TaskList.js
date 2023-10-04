import React from 'react';
import Card from "../../components/Card/Card";

const TaskList = ({taskList}) => {
  return (
    <div className="task-container">
        {taskList.map((taskObj, i) => {
          return (
            <div className="task-card" key={i}  >
                  <Card name={taskObj.Name} description={taskObj.Description} cardNum={i} />
            </div>
          );
        })}
      </div>
  )
}

export default TaskList