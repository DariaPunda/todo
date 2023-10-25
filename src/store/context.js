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
  setTaskList: () => { },
  message: "Something went wrong!",
  error: '',
  setError: () => { },
  loading: false,
  setLoading:() =>{},
});

export const ContextProvider = (props) => {
  const [posted, setPosted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [status, setStatus] = useState("progress");
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchedTasks = useCallback(async () => {
    setLoading(true);
    setError('');
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
      setError(error.message);
      console.log(error.message);
    }
    setLoading(false);
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
        error: error,
        setError: setError,
        loading: loading,
        setLoading:setLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
