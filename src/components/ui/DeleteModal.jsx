import React, { useEffect, useRef, useState } from "react";
import waringIcon from "../../assets/warninglogo.svg";

const DeleteModal = ({ id, data, title, onCloseModal, onDelete, isOpen }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseModal();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
          <img
            className="w-[64px] lg:w-[84px] h-auto"
            src={waringIcon}
            alt="warning logo"
          />
          <p data-cy="modal-delete-title" className="mt-8 text-[14px] text-center font-[500]">
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
