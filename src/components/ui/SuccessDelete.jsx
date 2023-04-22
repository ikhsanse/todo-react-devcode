import React from "react";

const SuccessDelete = ({ msg, onCloseNotif }) => {
  return (
    <div
      onClick={onCloseNotif}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div className="fixed inset-x-2g md:inset-x-0 top-1/2 z-40 flex items-center justify-center">
        <div
          data-cy="modal-information"
          className=" flex w-full max-w-lg items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm shadow-md"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-cy="modal-information-icon"
          >
            <path
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8v4M12 16h.01"
              stroke="#00A790"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <p data-cy="modal-information-title">{msg}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessDelete;
