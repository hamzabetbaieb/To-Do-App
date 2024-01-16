import "./App.css";
import React, { useEffect, useState } from 'react';
import {AiOutlineDelete,} from 'react-icons/ai'
import {BsCheckLg,} from 'react-icons/bs'


function App() {
const [isCompleteScreen,setisCompleteScreen]=useState(false);
const [newTitle,setnewTitle]= useState("");
const[newDescription,setnewDescription]=useState("");
const[allTodos,setallTodos]=useState([])


  


const handleAddTodo = ()=>{
const newTodoItem ={
  Title : newTitle,
  Description : newDescription
}
const updateTodo = [...allTodos]
updateTodo.push(newTodoItem)
setallTodos(updateTodo)
localStorage.setItem('todolist', JSON.stringify(updateTodo))
setnewTitle("")
setnewDescription("")
}
const handleDeleteTodo =(index)=>{
  let reduceTodo=[...allTodos]
  reduceTodo.splice(index,1)
  localStorage.setItem('todolist', JSON.stringify(reduceTodo))
  setallTodos(reduceTodo);

  };

useEffect(()=>{
let savedtodo =  JSON.parse (localStorage.getItem('todolist'))
  if (savedtodo){
    setallTodos(savedtodo)
  }
},[]);



  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-items">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} placeholder="write something" />
          </div>
          <div className="todo-input-items">
            <label>Description</label>
            <input type="text"  value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="write something" />
          </div>
          <div className="todo-input-items">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen===false && "active"}`} onClick={()=>setisCompleteScreen(false)}>TODO</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && "active"}`} onClick={()=>setisCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">

        {allTodos.map((item,index)=>(
          
        
          <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.Title}</h3>
            <p>{item.Description}</p>
            </div>
            <div>
              <AiOutlineDelete onClick={()=>handleDeleteTodo(index)} className="icon"/>
              <BsCheckLg className="check-icon"/>
            </div>
          
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
