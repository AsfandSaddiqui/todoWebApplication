import React from "react";
import style from "./todo.module.css";

const Todo = (props) => {
  return (
    <>
      <li data-testid="title">
        {props.todo}
        <span className={style.icon} data-testid="icon">
          <i
            className="fas fa-check"
            data-testid="btn2"
            onClick={() => {
              props.onClick(props.id);
            }}
          ></i>
        </span>
      </li>
    </>
  );
};

export default Todo;
