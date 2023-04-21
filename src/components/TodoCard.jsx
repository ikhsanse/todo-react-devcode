import React, { useState } from "react";

const TodoCard = ({
  id,
  title,
  priority,
  onOpenModal,
  status,
  onChangeStatus,
  onEditModal,
}) => {
  const [checkedTodo, setCheckedTodo] = useState(status);

  const handleChekedTodo = (e) => {
    // e.preventDefault();
    if (status === 1) {
      onChangeStatus(id, false);
      setCheckedTodo(0);
    } else {
      onChangeStatus(id, true);
      setCheckedTodo(1);
    }
  };
  return (
    <div className="my-3 flex flex-col gap-[10px]">
      <div
        data-cy="todo-item"
        className="flex justify-between rounded-xl bg-white p-[30px] text-lg font-medium shadow-lg"
      >
        <div className="flex gap-x-4 items-center">
          <input
            onChange={handleChekedTodo}
            type="checkbox"
            checked={checkedTodo === 0}
            data-cy="todo-item-checkbox"
            className="border-secondary h-5 w-5 cursor-pointer border rounded-none flex items-center justify-center"
          ></input>
          <span
            className={`rounded-full bg-${priority} h-[9px] w-[9px]`}
            data-cy="todo-item-priority-indicator"
          ></span>
          <h3
            data-cy="todo-item-title"
            className={`${
              checkedTodo === 0 ? "line-through text-gray1" : "text-black"
            } pb-[2px] text-[18px]`}
          >
            {title}
          </h3>
          <button onClick={()=>onEditModal(id, title, priority)} data-cy="todo-item-edit-button">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4"
                stroke="#A4A4A4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>

        <button
          onClick={() => onOpenModal(id, title, priority)}
          data-cy="todo-item-delete-button"
          className="ml-auto"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
