import React from "react";
import iconPlus from "../../assets/iconplus.svg";

const baseUrl = import.meta.env.VITE_END_POINT;
const email = import.meta.env.VITE_EMAIL_DEV;
const ButtonAdd = ({ DataCy }) => {
  const handleSubmit = () => {
    let data;
    if (DataCy === "activity-add-button") {
      data = {
        title:'New Activity',
        email:email
      }
      fetch(`${baseUrl}/activity-groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    } else {
      return
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
