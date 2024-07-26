import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div
      onClick={() => {
        toggle(id);
      }}
      className="flex items-center gap-2 my-3"
    >
      {/* tasks/tick icon */}
      <div className="flex items-center flex-1 cursor-pointer">
        <img src={isComplete ? tick : not_tick} alt="" className="w-7" />
        <p
          className={`text-slate-700 ml-4 text-[17px] decoration-slate-900 font-medium ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>

      {/* delete icon  */}
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt=""
        className="w-5 cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;
