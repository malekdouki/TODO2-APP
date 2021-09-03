import React, {useState} from 'react'
import {FaCheckCircle, FaEdit, FaTrash} from "react-icons/fa"
import app from './firebase'
import swal from 'sweetalert'

const Todo = ({todo}) => {
    const [newTaskName, setNewTaskName] = useState("");
    const [taskName, setTaskName] = useState("")

    const completeTodo = () => {
        const todoRef = app.database().ref("Todo").child(todo.id);
        todoRef.update({
            complete: ! todo.complete,
        })
        swal("Good job", "Todo Completed", "success",)
    };
    const handleChange = (e) => {
        if (todo.complete === true){
            setNewTaskName(todo.taskName);
        }else{
            todo.taskName = "";
            setNewTaskName(e.target.value)
        }
        todo.taskName = "";
        setNewTaskName(e.target.value);
    };
    const editTodo = () => {
        const todoRef = app.database().ref("Todo").child(todo.id);
        todoRef.update({
            taskName: newTaskName
        })
    };
    const deleteTodo = () => {
        const todoRef = app.database().ref("Todo").child(todo.id);
        todoRef.remove();
    };
    const createTodo = (e) => {
        e.preventDefault();
        const todoRef = app.database().ref("Todo");
        const todo ={
          taskName,
          complete: false,
        }
        todoRef.push(todo);
      };
    return (
        <div>
           <li className={todo.complete ? "complete" :'li'}>
              <input 
                type="text"
                value={todo.taskName ==="" ? newTaskName : todo.taskName}
                onChange={handleChange}
                className="input"
               />
              <FaCheckCircle className="button-complete task-button" onClick={completeTodo}/>
              <FaEdit  onClick={editTodo} className="button-edit task-button"/>
              <FaTrash onClick={deleteTodo} className="button-delete task-button" />
           </li>
        </div>
        
    )
}

export default Todo

