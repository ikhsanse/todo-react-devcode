import React, { useEffect, useState } from "react";
import ButtonAdd from "./ui/ButtonAdd";
import { Link, useParams } from "react-router-dom";
import TodoCard from "./TodoCard";
import AddTodoModal from "./ui/AddTodoModal";
import useTodoStore from "../store/todo";
import SuccessDelete from "./ui/SuccessDelete";
import DeleteModal from "./ui/DeleteModal";
import emptyTodo from '../assets/emptytodo.png'

const baseUrl = import.meta.env.VITE_END_POINT;

const ActivityDetails = () => {
  const [item, setItem] = useState({});
  const [showEditField, setShowEditField] = useState(false);
  const [activityValue, setActivityValue] = useState();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notifIsShow, setNotifIsShow] = useState(false);
  const [onSorting, setOnSorting] = useState("sort-latest");
  const [openSort, setOpenSort] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    id: null,
    title: "",
    priority: "",
  });
  const { id } = useParams();

  const {
    todos,
    fetchTodos,
    deleteTodo,
    updateTodoIsActive,
    sortTodosByIdAscending,
    sortTodosByIdDescending,
    sortByTitleAsc,
    sortByTitleDesc,
    sortTodosByIsActive,
  } = useTodoStore();
  const notifMsg = useTodoStore((state) => state.message);
  const handleSortClick = (e) => {
    e.preventDefault();
    const value = e.currentTarget.getAttribute("data-sort");
    switch (value) {
      case "sort-latest":
        sortTodosByIdDescending();
        break;
      case "sort-oldest":
        sortTodosByIdAscending();
        break;
      case "sort-az":
        sortByTitleAsc();
        break;
      case "sort-za":
        sortByTitleDesc();
        break;
      case "sort-unfinished":
        sortTodosByIsActive();
        break;
      default:
        sortTodosByIdDescending();
        break;
    }
    setOnSorting(value);
    setOpenSort(false);
  };

  const sortToggle = () => {
    setOpenSort(!openSort);
  };

  useEffect(() => {
    fetchTodos(id);
  }, []);

  const isActiveHandler = (todoId, isActive) => {
    updateTodoIsActive(todoId, isActive);
  };

  const deleteHandler = (id) => {
    const deleted = deleteTodo(id);
    if (deleted) {
      setNotifIsShow(true);
      setModalIsOpen(false);
    } else {
      setNotifIsShow(false);
    }
  };

  const closeNotif = () => {
    setNotifIsShow(false);
  };

  const openModal = (id, title) => {
    setModalIsOpen(true);
    setCurrentTodo({ id: id, title: title });
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`${baseUrl}/activity-groups/${id}`);
      const data = await response.json();
      setItem(data);
      setActivityValue(data.title);
    };
    fetchItem();
  }, [id]);

  const updateActivity = async (title) => {
    try {
      const response = await fetch(`${baseUrl}/activity-groups/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const openEditField = () => {
    setShowEditField(!showEditField);
  };

  const closeEditField = async () => {
    setShowEditField(false);
    await updateActivity(activityValue);
  };

  const editHandler = (e) => {
    e.preventDefault();
    setActivityValue(e.target.value);
  };

  const addModalToggle = () => {
    setOpenAddModal(!openAddModal);
  };

  const editModalToggle = (id, title, priority) => {
    setCurrentTodo({ id: id, title: title, priority: priority });
    setOpenEditModal(!openEditModal);
  };

  return (
    <>
      {notifIsShow ? (
        <SuccessDelete msg={notifMsg} onCloseNotif={closeNotif} />
      ) : (
        ""
      )}
      {modalIsOpen ? (
        <DeleteModal
          id={currentTodo.id}
          title={currentTodo.title}
          onCloseModal={closeModal}
          onDelete={deleteHandler}
          isOpen={modalIsOpen}
          data="Todo"
        />
      ) : (
        ""
      )}
      {openAddModal ? (
        <AddTodoModal
          type="add"
          data={id}
          isOpen={openAddModal}
          onToggle={addModalToggle}
        />
      ) : (
        ""
      )}
      {openEditModal ? (
        <AddTodoModal
          type="update"
          data={currentTodo}
          isOpen={openEditModal}
          onToggle={editModalToggle}
        />
      ) : (
        ""
      )}

      <div className="mt-12 mx-auto">
        <div className="flex flex-row mb-12 items-center">
          <Link data-cy="todo-back-button" className="mr-3" to="/">
            <svg
              width="16"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m3.667 12 8 8M3.667 12l8-8"
                stroke="#111"
                strokeWidth="5"
                strokeLinecap="square"
              ></path>
            </svg>
          </Link>
          {showEditField ? (
            <input
              onChange={editHandler}
              onBlur={closeEditField}
              type="text"
              className="border-b leading-3 border-black bg-transparent text-2xl md:text-4xl font-bold outline-none w-2/3"
              value={activityValue}
            ></input>
          ) : (
            <h1
              data-cy="todo-title"
              className="text-2xl md:text-4xl font-bold"
            >
              {activityValue}
            </h1>
          )}

          <button
            onClick={openEditField}
            className="ml-5 pt-2"
            data-cy="todo-title-edit-button"
          >
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
          <div className="ml-auto relative flex gap-x-3">
            <button onClick={sortToggle} data-cy="todo-sort-button">
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 24L22 20M22 20L26 24M22 20V34"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                ></path>
                <path
                  d="M36 30L32 34M32 34L28 30M32 34V20"
                  stroke="#888888"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                ></path>
                <rect
                  x="0.5"
                  y="0.5"
                  width="53"
                  height="53"
                  rx="26.5"
                  stroke="#E5E5E5"
                ></rect>
              </svg>
            </button>
            <div
              data-cy="sort-parent"
              className={`${
                openSort ? "block" : "hidden"
              } absolute top-10 md:top-16 w-[187px] h-[207px] md:w-[234px] lg:h-[260px] rounded-lg border-[1px] bg-white border-gray2`}
            >
              <div
                onClick={handleSortClick}
                data-sort="sort-latest"
                data-cy="sort-selection"
                className="h-[41.4px] lg:h-[52px] gap-4 px-4 flex justify-between cursor-pointer items-center border-b-[1px] border-gray2"
              >
                <div className="flex items-center gap-x-3">
                  <svg
                    className="mt-[2px]"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.104 4.11398H8.47699"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.104 7.69598H7.283"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.104 11.278H7.283"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9.6709 9.48697L11.4619 11.278L13.2529 9.48697"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M11.4619 4.11398V11.278"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <p className="text-[16px]">Terbaru</p>
                </div>
                {onSorting === "sort-latest" ? (
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
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={handleSortClick}
                data-sort="sort-oldest"
                data-cy="sort-selection"
                className="h-[41.4px] lg:h-[52px] gap-4 px-4 flex justify-between cursor-pointer items-center border-b-[1px] border-gray2"
              >
                <div className="flex items-center gap-x-3">
                  <svg
                    className="mt-[2px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.104 4.50589H7.283"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.104 8.08789H7.283"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.104 11.6699H8.47699"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9.6709 6.29689L11.4619 4.50589L13.2529 6.29689"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M11.4619 4.50589V11.6699"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <p className="text-[16px]">Terlama</p>
                </div>
                {onSorting === "sort-oldest" ? (
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
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={handleSortClick}
                data-sort="sort-az"
                data-cy="sort-selection"
                className="h-[41.4px] lg:h-[52px] gap-4 px-4 flex justify-between cursor-pointer items-center border-b-[1px] border-gray2"
              >
                <div className="flex items-center gap-x-3">
                  <svg
                    className="mt-[2px]"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.6709 6.2858V3.30081C9.6709 2.47695 10.041 2.10681 10.8649 2.10681C11.6888 2.10681 12.0589 2.47695 12.0589 3.30081V6.2858M12.0589 4.49481H9.6709"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12.0589 12.8528H9.6709L12.0589 8.6738H9.6709"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.104 9.27081L4.895 11.0618L6.686 9.27081"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M4.89502 3.8978V11.0618"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <p className="text-[16px]">A-Z</p>
                </div>
                {onSorting === "sort-az" ? (
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
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={handleSortClick}
                data-sort="sort-za"
                data-cy="sort-selection"
                className="h-[41.4px] lg:h-[52px] gap-4 px-4 flex justify-between cursor-pointer items-center border-b-[1px] border-gray2"
              >
                <div className="flex items-center gap-x-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.6709 13.2447V10.2597C9.6709 9.43586 10.041 9.06572 10.8649 9.06572C11.6888 9.06572 12.0589 9.43586 12.0589 10.2597V13.2447M12.0589 11.4537H9.6709"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12.0589 6.67773H9.6709L12.0589 2.49873H9.6709"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.104 9.66272L4.895 11.4537L6.686 9.66272"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M4.89502 4.28973V11.4537"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <p className="text-[16px]">Z-A</p>
                </div>
                {onSorting === "sort-za" ? (
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
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={handleSortClick}
                data-sort="sort-unfinished"
                data-cy="sort-selection"
                className="h-[41.4px] lg:h-[52px] gap-4 px-4 flex justify-between cursor-pointer items-center"
              >
                <div className="flex items-center gap-x-3">
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.50684 5.47264L4.89483 3.08464M4.89483 3.08464L7.28283 5.47264M4.89483 3.08464V11.4426"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M13.253 9.05463L10.865 11.4426M10.865 11.4426L8.47705 9.05463M10.865 11.4426V3.08464"
                      stroke="#16ABF8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <p className="text-[16px]">Belum Selesai</p>
                </div>
                {onSorting === "sort-unfinished" ? (
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
                ) : (
                  ""
                )}
              </div>
            </div>
            <ButtonAdd onAddToggle={addModalToggle} DataCy="todo-add-button" />
          </div>
        </div>
        {todos.length > 0 ? (
          <div>
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                status={todo.is_active === true || todo.is_active === 1 ? 1 : 0}
                priority={todo.priority}
                onOpenModal={openModal}
                onChangeStatus={isActiveHandler}
                onEditModal={editModalToggle}
              />
            ))}
          </div>
        ) : (
          <div
            data-cy="todo-empty-state"
            className="flex py-16 justify-center cursor-pointer"
          >
            <img
              onClick={addModalToggle}
              className="w-full lg:w-[60%] h-auto"
              src={emptyTodo}
              alt="empty Todo"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityDetails;
