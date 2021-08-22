import React from "react";
import style from "./todo.module.css";

const Todo = (props) => {
  return (
    <>
      <li data-testid="title">
        {props.todo}
        <span
          className={style.icon}
          data-testid="icon"
          onClick={() => {
            props.onClick(props.id);
          }}
        >
          <i className="fas fa-check"></i>
        </span>
      </li>
    </>
  );
};

export default Todo;
