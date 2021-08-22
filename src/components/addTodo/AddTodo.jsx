import React, { useState, useEffect } from "react";
import Todo from "../todo/Todo";
import style from "./addTodo.module.css";

const AddTodo = () => {
  //get store todo list from local storage
  const getTodoList = () => {
    let result = JSON.parse(localStorage.getItem("list"));
    if (result) return result;
    else return [];
  };

  //define states
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(getTodoList());
  const [counter, setCounter] = useState(todoList.length);

  //Click Handler
  const handleClick = () => {
    setCounter(counter + 1);
    let obj = { id: counter, todo: todo };
    setTodoList([...todoList, obj]);
    setTodo("");
  };

  //Adding Todo Items in Local Storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  //Input Form Change Handler
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  //remove completed todos
  const removeTodo = (todoId) => {
    let list = getTodoList();
    let result = list.filter((l) => {
      return l.id !== todoId;
    });
    setTodoList(result);
  };

  return (
    <>
      <header>Todo App</header>
      <div className={style.inputField}>
        <input
          type="text"
          placeholder="Add your new todo"
          onChange={handleChange}
          value={todo}
        />
        <button onClick={handleClick} data-testid="add_btn">
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <ul className={style.todoList}>
        {todoList.map((l, index) => (
          <Todo todo={l.todo} key={index} onClick={removeTodo} id={l.id} />
        ))}
      </ul>
    </>
  );
};
export default AddTodo;
