import React from 'react'
import './todos.css'
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";

function todos() {
    return (
        <div className='todo-container'>
            <div className="todo-text">
                <h2>Title of todo</h2>
                <p>Description of todo</p>
            </div>
            <div className="todo-icon">
                <AiOutlineDelete className='delete-icon icon'/>
                <FaCheck className='check-icon icon'/>
            </div>
        </div>
    )
}

export default todos
