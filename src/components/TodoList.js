import React, {useState, useEffect} from 'react'
import app from './firebase'
import Todo from './Todo'

const TodoList = () => {
    const [todoList, setTodoList] = useState();
    useEffect(() => {
        const todoRef = app.database().ref("Todo");
        todoRef.on("value", (snapshot) => {
           const todos = snapshot.val();
           const todoList = [];
           for (let id in todos){
               todoList.push({ id, ...todos[id] });
           }
           setTodoList(todoList);
        });
    }, [])
    return (
        <div>
            {todoList ? todoList.map((todo) => <Todo todo = {todo} />) : ""}
        </div>
    )
}

export default TodoList
