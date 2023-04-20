import React, { useState } from "react";
import deleteBtn from "../assets/deletebtn.svg";
import DeleteModal from "./ui/DeleteModal";
import SuccessDelete from "./ui/SuccessDelete";
const baseUrl = import.meta.env.VITE_END_POINT;

const ActivityCard = ({ id, title, date }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false)
  const inputDate = new Date(date);
  const day = inputDate.getUTCDate();
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getUTCFullYear();

  const outputDateStr = `${day} ${month} ${year}`;

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/activity-groups/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSuccessMsg('Berhasil Dihapus')
        setShowSuccess(true)
      } else {
        console.error(
          "Delete request failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Delete request failed:", error);
    }
  };

  const handleDelete = (id, data) => {
    if (data === "Activity") {
      fetch(`${baseUrl}/activity-groups/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(modalMainClose)
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };
  return (
    <>
    {showSuccess && <SuccessDelete msg={successMsg} />}
      
      <div className="bg-white h-full w-auto lg:w-[235px] rounded-lg shadow-lg p-[25px]">
        {modalIsOpen ? (
          <DeleteModal
            onDelete={deleteActivity}
            title={title}
            id={id}
            onCloseModal={closeModal}
            data="Activity"
          />
        ) : (
          ""
        )}
        <div data-cy="activity-item" className="flex flex-col h-full">
          <p data-cy="activity-item-title" className="text-lg font-bold">
            {title}
          </p>
          <div className="flex mt-auto justify-between">
            <p data-cy="activity-item-date" className="text-sm text-gray1">
              {outputDateStr}
            </p>
            <button onClick={openModal} data-cy="activity-item-delete-button">
              <img src={deleteBtn} alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
