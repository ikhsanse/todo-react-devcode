import React, { useEffect, useState } from "react";
import deleteBtn from "../assets/deletebtn.svg";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_END_POINT;

const ActivityCard = ({ id, title, date, onOpenModal }) => {
  const inputDate = new Date(date);
  const day = inputDate.getUTCDate();
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getUTCFullYear();

  const outputDateStr = `${day} ${month} ${year}`;

  return (
    <>
      <div className="bg-white h-full w-auto lg:w-[235px] rounded-[12px] shadow-lg p-[25px]">
        <Link
          to={`detail/${id}`}
          data-cy="activity-item"
          className="flex flex-col h-[90%] cursor-pointer"
        >
          <p data-cy="activity-item-title" className="text-lg font-bold">
            {title}
          </p>
        </Link>
        <div className="flex mt-auto justify-between">
          <p data-cy="activity-item-date" className="text-sm text-gray1">
            {outputDateStr}
          </p>
          <button
            onClick={() => onOpenModal(id, title)}
            data-cy="activity-item-delete-button z-40"
          >
            <img src={deleteBtn} alt="delete" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
