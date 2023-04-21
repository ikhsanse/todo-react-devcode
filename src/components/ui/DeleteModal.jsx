import React, { useEffect, useRef, useState } from "react";

const DeleteModal = ({ id, data, title, onCloseModal, onDelete, isOpen }) => {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseModal();
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
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75">
      <div
        ref={modalRef}
        data-cy="modal-delete"
        className="absolute top-1/4 inset-x-auto bg-white w-[320px] h-[300px] md:w-[490px] md:h-[355px] rounded-lg"
      >
        <div className="flex flex-col justify-center items-center py-10 px-5 md:py-16">
          <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-cy="modal-delete-icon"
          >
            <path
              d="M31 38.75V38.7758M31 23.25V28.4167V23.25Z"
              stroke="#ED4C5C"
              strokeWidth="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12.9168 49.0843H49.0834C49.9264 49.0783 50.7551 48.8663 51.4973 48.4665C52.2394 48.0668 52.8725 47.4915 53.3413 46.7909C53.8101 46.0903 54.1003 45.2856 54.1867 44.447C54.273 43.6085 54.1529 42.7616 53.8368 41.9801L35.4951 10.3343C35.0483 9.52671 34.3933 8.85358 33.5983 8.38485C32.8032 7.91612 31.8972 7.6689 30.9742 7.6689C30.0513 7.6689 29.1453 7.91612 28.3502 8.38485C27.5552 8.85358 26.9002 9.52671 26.4534 10.3343L8.11175 41.9801C7.8016 42.7437 7.67861 43.5704 7.75306 44.3911C7.8275 45.2119 8.09721 46.003 8.53968 46.6983C8.98215 47.3936 9.58454 47.973 10.2965 48.3881C11.0086 48.8031 11.8095 49.0418 12.6326 49.0843"
              stroke="#ED4C5C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <p
            data-cy="modal-delete-title"
            className="mt-8 text-[14px] text-center font-[500]"
          >
            Apakah anda yakin menghapus {data} <b>{`"${title}"`}</b>
          </p>
          <div className="flex flex-row mt-11 gap-3 md:gap-5">
            <button
              onClick={onCloseModal}
              className="flex h-[54px] items-center rounded-full px-7 font-semibold hover:opacity-70 bg-secondary text-[#4A4A4A] w-36 justify-center"
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </button>
            <button
              onClick={() => onDelete(id)}
              className="flex h-[54px] items-center gap-[6px] rounded-full px-7 font-semibold hover:opacity-70 bg-danger text-white w-36 justify-center"
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
