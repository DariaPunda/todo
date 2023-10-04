import { useState } from "react";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter/Filter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TaskList from "./components/TaskList/TaskList";

function App() {

  const [taskList, setTaskList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  const saveTaskHandler = (task) => {
    // if (task.Name === '' || task.Description === '') {
    //     return
    // };
    task["Status"] = currentFilter;
    console.log(taskList.Status);
    setTaskList((prev) => [...prev, task]);
    // setIsVisible(false);

    console.log(taskList);
  };
  

  const filterHandler = (filter) => {
    setCurrentFilter(filter);
  };

  const filterList = currentFilter === 'all' ? taskList: taskList.filter((task)=> task.Status === currentFilter)



  return (
    <div className="App">
      <TodoList saveTask={saveTaskHandler}/>
      <Filter onFilterChange={ filterHandler} />
      <TaskList taskList={filterList}/>
    </div>
  );
}

export default App;
