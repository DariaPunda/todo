import { useState } from "react";
import ToDoList from "./components/ToDoList/TodoList";
import Filter from "./components/Filter/Filter";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentFilter, setCurrentFilter] = useState("all");

  const filterHandler = (filter) => {
    setCurrentFilter(filter);
  };

  return (
      <div className="App">
        <ToDoList />
        <main >
          <Filter onFilterChange={filterHandler} />
          <TaskList onFilter={currentFilter} />
        </main>
      
          <Footer />
      </div>
  );
}

export default App;
