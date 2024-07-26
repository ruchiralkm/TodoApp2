import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className="flex flex-col w-11/12 max-w-md bg-white place-self-center p-7 min-h-[550px] rounded-xl">
      {/* title */}
      <div className="flex items-center gap-2 mt-7">
        <img src={todo_icon} alt="" className="w-8" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>

      {/* inputs box*/}
      <div className="flex items-center bg-gray-200 rounded-full my-7">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 pl-6 pr-2 font-medium bg-transparent border-0 outline-none h-14 placeholder:text-slate-600"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="w-32 text-lg font-medium text-white bg-green-600 border-none rounded-full cursor-pointer h-14"
        >
          Add Task
        </button>
      </div>

      {/* Todo List*/}
      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
