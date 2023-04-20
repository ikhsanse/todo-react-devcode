import React, { useEffect, useState } from "react";
import useActivityStore from "../store/activity";
import ButtonAdd from "./ui/ButtonAdd";
import emptyActivity from "../assets/emptyactivity.png";
import ActivityCard from "./ActivityCard";
import DeleteModal from "./ui/DeleteModal";
import SuccessDelete from "./ui/SuccessDelete";

const ActivityHome = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notifIsShow, setNotifIsShow] = useState(false);
  const [curretActivity, setCurrentActivity] = useState({
    id: null,
    title: "",
  });
  const { activities, fetchActivities, deleteActivity } = useActivityStore();
  const notifMsg = useActivityStore((state) => state.message);

  const openModal = (id, title) => {
    setModalIsOpen(true);
    setCurrentActivity({ id: id, title: title });
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteHandler = async (id) => {
    const deleted = await deleteActivity(id);
    if (deleted) {
      setNotifIsShow(true);
      setModalIsOpen(false)
    } else {
      setNotifIsShow(false);
    }
  };
  const closeNotif = () => {
    setNotifIsShow(false)
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  let activityRender;
  if (activities?.length > 0) {
    activityRender = (
      <div className=" place-content-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] py-12 mx-auto grid-flow-row auto-rows-[180px] md:auto-rows-[234px] ">
        {activities?.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            title={activity.title}
            date={activity.created_at}
            onDelete={deleteHandler}
            onOpenModal={openModal}
            onCloseModal={closeModal}
            showModal={modalIsOpen}
          />
        ))}
      </div>
    );
  } else {
    activityRender = (
      <div
        data-cy="activity-empty-state"
        className="flex py-16 justify-center cursor-pointer"
      >
        <img
          className="w-full lg:w-[60%] h-auto"
          src={emptyActivity}
          alt="empty activity"
        />
      </div>
    );
  }

  return (
    <>
    {notifIsShow ? <SuccessDelete msg={notifMsg} onCloseNotif={closeNotif}/> : ''}
      {modalIsOpen ? (
        <DeleteModal
          id={curretActivity.id}
          title={curretActivity.title}
          onCloseModal={closeModal}
          onDelete={deleteHandler}
          data="Activity"
        />
      ) : (
        ""
      )}
      <div className="mt-12 mx-auto">
        <div className="flex flex-row justify-between">
          <h1 data-cy="activity-title" className="text-5xl font-bold">
            Activity
          </h1>
          <ButtonAdd DataCy="activity-add-button" />
        </div>
        {activityRender}
      </div>
    </>
  );
};

export default ActivityHome;
