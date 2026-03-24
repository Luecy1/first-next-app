"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-slate-800 font-bold mb-4 text-center">My TODO</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-blue-600 flex-1 border p-2 rounded"
          placeholder="タスクを入力..."
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          追加
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between border-b py-2">
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-400"}`}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500 text-sm">
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}