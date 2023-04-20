import React, { useEffect, useState } from "react";
import ButtonAdd from "./ui/ButtonAdd";
import { Link, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_END_POINT;

const ActivityDetails = () => {
  const [item, setItem] = useState({});
  const [showEditField, setShowEditField] = useState(false);
  const [editTitle, setEditTitle] = useState();
  const { id } = useParams();

  // console.log(editTitle)

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`${baseUrl}/activity-groups/${id}`);
      const data = await response.json();
      setItem(data);
      setEditTitle(data.title);
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

  const closeEditField = () => {
    setShowEditField(false);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setEditTitle(e.target.value);
    await updateActivity(e.target.value);
  };

  return (
    <div  className="mt-12 mx-auto">
      <div className="flex flex-row items-center">
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
            className="border-b leading-3 border-black bg-transparent text-4xl font-bold outline-none w-2/3"
            value={editTitle}
          ></input>
        ) : (
          <h1 data-cy="activity-title leading-3" className="text-4xl font-bold">
            {editTitle}
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
        <div className="ml-auto">
          <ButtonAdd DataCy="todo-add-button" />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
