import React from "react";
import style from "./mainComponent.module.css";
import AddTodo from "./components/addTodo/AddTodo";

const MainComponent = () => {
  return (
    <>
      <div className={style.wrapper}>
        <AddTodo />
      </div>
    </>
  );
};

export default MainComponent;
