import React, { useState } from "react"
import {  Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from './firebase'
import TodoList from "./TodoList"
import '../App.css'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [taskName, setTaskName] = useState("")
  const createTodo = (e) => {
    e.preventDefault();
    const todoRef = app.database().ref("Todo");
    const todo ={
      taskName,
      complete: false,
    }
    todoRef.push(todo);
  };
  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  
  return (
    <div className="container-body">
      <div>
              <div className="uplog ">
                <Link to="/update-profile" id="button">
                   Update Profile
                </Link>
                <div>
                   <Button variant="link" onClick={handleLogout} id="button">
                     Log Out
                   </Button>
                </div>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="app-wrapper">
                <form onSubmit={createTodo} className="form">
                 <input 
                   type="text"
                   placeholder="enter a todo"
                   className="task-input"
                   value={taskName}
                   required
                   onChange={handleChange}
                  />
                  <button className="button-add" type="submit">
                    ADD
                  </button>
                   <TodoList />
                </form>
              </div>
      </div>      
    </div>
  )
}