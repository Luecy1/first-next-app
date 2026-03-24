"use client";

import { useRef, useState } from "react";
import { Spacer } from "./Spacer";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

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
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
      {/* dialog要素本体 */}
      <dialog
        ref={dialogRef}
        className="
        fixed inset-0 m-auto
        rounded-lg shadow-xl p-0 w-[90%] backdrop:bg-black/50
        "
      >
        <div className="p-6">
          <h2 className="text-xl font-bold">タイトル</h2>

          <Spacer size={4} />

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full text-blue-600 border p-2 rounded"
            placeholder="タスクを入力..."
          />

          <Spacer size={4} />

          <textarea
            rows={5}
            className="w-full text-blue-600 border p-2 rounded-md resize-none"
            placeholder="詳細を入力"
          />

          <Spacer size={4} />

          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              閉じる
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}