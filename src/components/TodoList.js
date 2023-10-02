import React, { useState } from 'react'
import CreateTaskPopup from '../modals/CreateTaskPopup'
// import AddTaskPopup from '../modals/AddTaskPopup';
// import Button from './Button';

const TodoList = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [taskList, setTaskList] = useState([]);
    
    const closeModal = () => {
        setIsVisible(!isVisible);
        console.log(isVisible);
    }
    const openModalHandler = () => {
        setIsVisible(true);
        console.log('clicked')
    }


    const saveTaskHandler = (task) => {


        if (task.Name === '' || task.Description === '') {
            return
        };
        setTaskList((prev) => [...prev, task]);
        setIsVisible(false);
        console.log(task);
        console.log(taskList);
    }

  return (
      <>
          <div className='header text-center primary-text-emphasis'>
              <h3 className='fs-1 text-primary'>Todo List</h3>
              <button onClick={openModalHandler} className='btn btn-primary mt-2'>Create Task</button>
        {/* <Button onClick={openModalHandler} className ='btn-primary' > Create Task</Button> */}
          </div>
          <div className='task-container'>     
             
          </div>
          <CreateTaskPopup openModal={isVisible} toggle={closeModal} saveTask={saveTaskHandler} /> 
          {/* {isVisible && <AddTaskPopup closeModal={closeModalHandler} />} */}
      </>
  )
}

export default TodoList