import { useEffect, useRef, useState } from 'react';
import './App.css';
import Todo from './todos.js'

import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";

function App() {

  const isFirstLoad = useRef(true);

  const [flag, setFlag] = useState(true);

  function handleTodo() {
    setFlag(true);
  }

  function handleComplete() {
    setFlag(false);
  }

  const formData = { title: "", description: "" };

  const [newData, setNewData] = useState(formData);
  // make an array to store all these objects/tasks
  const [taskList, setTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  function handleChange(e) {
    setNewData({ ...newData, [e.target.name]: e.target.value })
  }

  function handleDelete(listObjId) {
    setTaskList(taskList.filter((taskObj) => taskObj.id !== listObjId));
  }

  function handleDelete2(listObjId) {
    setCompletedTaskList(completedTaskList.filter((completedTaskObj) => completedTaskObj.id !== listObjId));
  }

  function handleCheck(listObjId) {
    const completedTask = taskList.find(task => task.id === listObjId);

    setCompletedTaskList([...completedTaskList, completedTask]);
    setTaskList(taskList.filter((taskObj) => taskObj.id !== listObjId));
  }

  // loads todo from local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('saveTodos'));
    const savedCompletedTodos = JSON.parse(localStorage.getItem('saveCompletedTodos'));
    setCompletedTaskList(savedCompletedTodos);
    setTaskList(savedTodos);
  }, [])

  // saving todos to localstorage 
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem('saveTodos', JSON.stringify(taskList));
    localStorage.setItem('saveCompletedTodos', JSON.stringify(completedTaskList));
  }, [taskList, completedTaskList]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newData.title) {
      alert("Title can't be empty")
    }
    else {
      // setTask([...task, newData]); // if you are using spread operator for array then use [] symbol when doing setData, and if for object then use {}
      // console.log(task);

      const newTask = {
        id: Date.now(),
        title: newData.title,
        description: newData.description
      };

      setTaskList(() => {
        const updatedList = [...taskList, newTask];
        console.log(updatedList);
        setNewData({ title: "", description: "" });
        return updatedList;
      });
      // now it will update imediately 
    }
  }

  // ***important 
  /* React State Updates Are Asynchronous

  When you call setTask([...task, newData]), React does not update the state immediately.
  Instead, it schedules the state update and re-renders the component asynchronously.

  So, when you log console.log(task); immediately after calling setTask(), it still logs the old state because the state hasn't updated yet. 
  The updated state will only be reflected in the next render.

  use functional update to resolve it
  */

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="form-container">
        <form className='form' onSubmit={handleSubmit}>
          <div className='input-div'>
            <label htmlFor="title">Title: </label><br />
            <input type="text" name='title' value={newData.title} onChange={handleChange} />
          </div>
          <div className='input-div'>
            <label htmlFor="description">Description: </label><br />
            <input type="text" name='description' value={newData.description} onChange={handleChange} />
          </div>
          <div className='add-div'>
            <button className='add-btn'>Add</button>
          </div>
        </form>
        <hr />
        <div className="tasks">
          <div className="two-btn">
            <button className={flag ? 'todoClicked' : 'todo-btn'} onClick={handleTodo}>Todo</button>
            <button className={flag ? 'completed-btn' : 'completeClicked'} onClick={handleComplete}>Completed tasks</button>
          </div>
          {flag ?
            ((taskList?.length || 0) != 0 ? taskList.map((listObj) => {
              return (
                <>
                  <div className="todo-container">
                    <div className="todo-text">
                      <h2 >{listObj.title}</h2>
                      <p className='todo-text-desc'>{listObj.description}</p>
                    </div>
                    <div className="todo-icons">
                      <AiOutlineDelete className='delete-icon icon' onClick={() => handleDelete(listObj.id)} />
                      <FaCheck className='check-icon icon' onClick={() => handleCheck(listObj.id)} />
                    </div>
                  </div>
                </>
              )
            }) : "")
            : (completedTaskList?.length || 0) != 0 // compltedTask != [] this is not working, which will always return false. This is because comparing arrays using != or == checks for reference equality, not content equality. Even if two arrays have the same elements, they are considered different objects in memory. >>> but true bhi return ho rha tha mere
              ? (completedTaskList.map((listObj) => {
                return (
                  <>
                    <div className="todo-container">
                      <div className="todo-text">
                        <h2 >{listObj.title}</h2>
                        <p >{listObj.description}</p>
                      </div>
                      <div className="todo-icons">
                        <AiOutlineDelete className='delete-icon icon' onClick={() => handleDelete2(listObj.id)} />
                      </div>
                    </div>
                  </>
                )
              }))
              : "No task to display"
          }
        </div>
      </div>
    </div>
  );
}

export default App;

{/* 
onClick={handleChange}	When you simply need to call a function without passing arguments.
onClick={() => handleDelete()}	When you need to pass arguments or wrap extra logic inside onClick.
*/}