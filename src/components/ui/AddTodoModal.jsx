import React, { useEffect, useRef, useState } from "react";
import useTodoStore from "../../store/todo";

const AddTodoModal = ({ onToggle, isOpen, data, type }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(
    type === "add" ? "" : data.priority
  );
  const [listItemValue, setListItemValue] = useState(
    type === "add" ? "" : data.title
  );
  

  const addModalRef = useRef();

  const { addTodo, updateTodo } = useTodoStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        onToggle();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const dropdownToggle = (e) => {
    e.preventDefault();
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handlePriorityClick = (e) => {
    e.preventDefault();
    const value = e.currentTarget.getAttribute("data-value");
    setSelectedPriority(value);
    setIsOpenDropdown(false);
  };

  const itemInputHandler = (e) => {
    e.preventDefault();
    setListItemValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "add") {
      const dataTodo = {
        activity_group_id: data,
        title: listItemValue,
        priority: selectedPriority ? selectedPriority : "very-high",
      };
      addTodo(dataTodo);
    } else {
      updateTodo(data.id, listItemValue, selectedPriority);
    }
    onToggle();
    // window.location.reload()
  };

  let textPriority;
  switch (selectedPriority) {
    case "very-high":
      textPriority = "Very High";
      break;
    case "high":
      textPriority = "High";
      break;
    case "normal":
      textPriority = "Medium";
      break;
    case "low":
      textPriority = "Low";
      break;
    case "very-low":
      textPriority = "Very Low";
      break;
    default:
      textPriority = "Very High";
  }
  let priorityRender;
  if (isOpenDropdown) {
    priorityRender = (
      <button data-cy="modal-add-priority-button" className="relative">
        <div
          onClick={dropdownToggle}
          className="p-3.5 bg-gray2 rounded-md flex w-[205px] justify-between items-center"
        >
          <p data-cy="modal-add-priority-item">Pilih Priority</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 15L12 9L18 15"
              stroke="#111111"
              strokeLinecap="square"
            ></path>
          </svg>
        </div>
        <div className="w-[205px] bg-white absolute border-x-[1px] top-[2.8rem] z-10 border-b-[1px] border-gray2 rounded-t-none rounded-md">
          <div
            onClick={handlePriorityClick}
            data-value="very-high"
            data-cy="modal-add-priority-very-high"
            className="cursor-pointer p-[14px] flex justify-between border-b-[1px] border-b-gray2"
          >
            <div className="flex gap-x-[19px] items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-very-high"></div>
              <p className="text-[16px]">Very High</p>
            </div>
            {selectedPriority === "very-high" ? (
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9L7.5 12.75L15 5.25"
                    stroke="#4A4A4A"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={handlePriorityClick}
            data-value="high"
            data-cy="modal-add-priority-high"
            className="cursor-pointer p-3.5 flex items-center justify-between border-b-[1px] border-b-gray2"
          >
            <div className="flex gap-x-[19px] items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-high"></div>
              <p className="text-[16px]">High</p>
            </div>
            {selectedPriority === "high" ? (
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9L7.5 12.75L15 5.25"
                    stroke="#4A4A4A"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={handlePriorityClick}
            data-value="normal"
            data-cy="modal-add-priority-medium"
            className="cursor-pointer p-3.5 flex justify-between border-b-[1px] border-b-gray2"
          >
            <div className="flex gap-x-[19px] items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-normal"></div>
              <p className="text-[16px]">Medium</p>
            </div>
            {selectedPriority === "normal" ? (
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9L7.5 12.75L15 5.25"
                    stroke="#4A4A4A"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={handlePriorityClick}
            data-value="low"
            data-cy="modal-add-priority-low"
            className="cursor-pointer p-3.5 flex justify-between border-b-[1px] border-b-gray2"
          >
            <div className="flex gap-x-[19px] items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-low"></div>
              <p className="text-[16px]">Low</p>
            </div>
            {selectedPriority === "low" ? (
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9L7.5 12.75L15 5.25"
                    stroke="#4A4A4A"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            onClick={handlePriorityClick}
            data-value="very-low"
            data-cy="modal-add-priority-very-low"
            className="cursor-pointer p-3.5 flex justify-between border-b-[1px] border-b-gray2"
          >
            <div className="flex gap-x-[19px] items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-very-low"></div>
              <p className="text-[16px]">Very Low</p>
            </div>
            {selectedPriority === "very-low" ? (
              <div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9L7.5 12.75L15 5.25"
                    stroke="#4A4A4A"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </button>
    );
  } else {
    priorityRender = (
      <button
        onClick={dropdownToggle}
        data-cy="modal-add-priority-dropdown"
        id=":r8:priority"
        type="button"
        className="border-gray2 flex h-[52px] w-52 items-center gap-4 rounded-md border py-4 px-5"
      >
        <span
          className={`h-[14px] w-[14px] rounded-full ${
            selectedPriority ? `bg-${selectedPriority}` : " bg-very-high"
          }`}
        ></span>
        {textPriority}
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-auto"
        >
          <path d="m6 9 6 6 6-6" stroke="#111" strokeLinecap="square"></path>
        </svg>
      </button>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center bg-black/30">
      <form
        onSubmit={submitHandler}
        ref={addModalRef}
        data-cy="modal-add"
        className="absolute top-[18%] w-full max-w-[830px] max-h-[403px] rounded-xl bg-white shadow-md"
      >
        <header className="border-gray2 flex items-center border-b px-5 py-4 text-lg font-semibold">
          <h3 data-cy="modal-add-title">Tambah List Item</h3>
          <button
            onClick={onToggle}
            data-cy="modal-add-close-button"
            className="ml-auto"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6 6 18M6 6l12 12"
                stroke="#A4A4A4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </header>
        <div className="flex flex-col py-4 px-5">
          <label
            data-cy="modal-add-name-title"
            htmlFor=":r8:name"
            className="mb-2 text-xs font-semibold uppercase"
          >
            Nama List Item
          </label>
          <input
            onChange={itemInputHandler}
            data-cy="modal-add-name-input"
            className="border-gray2 mb-3 h-14 rounded-md border py-3.5 px-5 outline-none focus:border-[#16ABF8]"
            type="text"
            placeholder="Tambahkan nama list item"
            required
            id=":r8:name"
            value={listItemValue}
          />
          <label
            data-cy="modal-add-priority-title"
            htmlFor=":r8:priority"
            className="mb-2 text-xs font-semibold uppercase"
          >
            Priority
          </label>
          <div>{priorityRender}</div>
        </div>
        <div className="border-gray2 border-t px-10 py-5">
          <button
            type="submit"
            className="flex  h-[54px] items-center gap-[6px] rounded-full px-7 font-semibold hover:opacity-70 bg-primary text-white ml-auto w-40 justify-center disabled:opacity-50"
            data-cy="modal-add-save-button"
            disabled={listItemValue?.length > 0 ? false : true}
          >
            {type === "add" ? "Simpan" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoModal;
