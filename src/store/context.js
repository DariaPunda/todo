import React, { useState, useCallback, useEffect } from "react";

const Context = React.createContext({
  posted: false,
  setPosted: () => {},
  deleted: false,
  setDeleted: () => {},
  edited: false,
  setEdited: () => {},
  status: "progress",
  setStatus: () => {},
  taskList: [],
  setTaskList: () => {},
});

export const ContextProvider = (props) => {
  const [posted, setPosted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [status, setStatus] = useState("progress");
  const [taskList, setTaskList] = useState([]);

  const fetchedTasks = useCallback(async () => {
    try {
      const response = await fetch(
        "https://todo-list-52df6-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedTask = [];

      for (const key in responseData) {
        loadedTask.push({
          id: key,
          Name: responseData[key].Name,
          Description: responseData[key].Description,
          Status: responseData[key].Status,
        });
      }
      setTaskList(() => [...loadedTask]);
      console.log(loadedTask);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
    
//Rerender the list if changed status, edited text, deleted the task and posted a task 
    
  useEffect(() => {
    fetchedTasks();
    if (posted) {
      setPosted(false);
    }
    if (deleted) {
    }
    setDeleted(false);

    if (edited) {
      setEdited(false);
    }
    console.log(status);
  }, [fetchedTasks, posted, deleted, status, edited]);

  return (
    <Context.Provider
      value={{
        posted: posted,
        setPosted: setPosted,
        deleted: deleted,
        setDeleted: setDeleted,
        edited: edited,
        setEdited: setEdited,
        status: status,
        setStatus: setStatus,
        taskList: taskList,
        setTaskList: setTaskList,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
