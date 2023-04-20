import React from "react";
import useActivityStore from "../../store/activity";
import iconPlus from "../../assets/iconplus.svg";

const baseUrl = import.meta.env.VITE_END_POINT;
const email = import.meta.env.VITE_EMAIL_DEV;
const ButtonAdd = ({ DataCy }) => {
  const { addActivity } = useActivityStore()
  const handleSubmit = () => {
    if (DataCy === "activity-add-button") {
      addActivity()
    } else {
      return ;
    }
  };
  return (
    <button
      onClick={handleSubmit}
      data-cy={DataCy}
      className="bg-primary flex text-white h-12 pl-7 pr-8 pb-2 pt-1 text-lg gap-2 font-medium leading-3 rounded-[45px] justify-center items-center"
    >
      {" "}
      <img className="font-bold w-5 h-5 mt-[2px]" src={iconPlus} alt="" />{" "}
      Tambah
    </button>
  );
};

export default ButtonAdd;
