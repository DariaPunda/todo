import React, { useState } from 'react';
import './CreateTask.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({ toggle, saveTask}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const changeHandler = (e) => {
        const { name, value } = e.target;

        if (name === 'taskName') {
            setTaskName(value);
        } else {
            setDescription(value);
        }
  
    };

    const submitTaskHandler = (e) => {

        if (e.target.name === '') {
            toggle();
        }
     
        let task = {};
        task['Name'] = taskName;
        task['Description'] = description;
        saveTask(task);
        setTaskName('');
        setDescription('');
    };



    return (<Modal  toggle={toggle} >
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
            <form >
                <div  className='form-group mb-3'>
                   <label className='form-label text-primary-emphasis'>Task Name</label>
                    <input type='text' className='form-control' value={taskName} name='taskName' onChange={changeHandler}></input>
                   
                </div>
                 <div className='form-group mb-3'>
                    <label className='form-label text-primary-emphasis'>Description</label>

                    <textarea className='form-control' rows='5' resize='none'  value={description} name='description' onChange={changeHandler} ></textarea>
                                    
                 </div>
        </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitTaskHandler} type='submit' >
            Create
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>)
}

export default CreateTaskPopup;