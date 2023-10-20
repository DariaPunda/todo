import { useCallback, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter/Filter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TaskList from "./components/TaskList/TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [posted, setPosted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [status, setStatus] = useState("progress");



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
         console.log(loadedTask)
    } catch (error) {
      console.log(error.message);
    }
 
  }, [ ]);

  useEffect(() => {
     fetchedTasks(); 
     if (posted) {
      setPosted(false);
      // console.log(posted);
    }
    if (deleted) { }
    setDeleted(false);
    
    if (edited) {
      setEdited(false);
    }
    console.log(status);
  }, [fetchedTasks, posted,deleted,status, edited]);


const filterHandler = (filter) => {
  setCurrentFilter(filter);
};


  return (
    <div className="App">
      <TodoList onPosted={setPosted} onStatus={status} />
      <Filter onFilterChange={ filterHandler} />
      <TaskList taskList={taskList} onDelete={setDeleted} onStatusChange={setStatus} onFilter={currentFilter} onEdited={setEdited } />
    </div>
  );
}

export default App;
