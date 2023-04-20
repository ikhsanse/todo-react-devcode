import React, { useEffect, useState } from "react";
import ButtonAdd from "./ui/ButtonAdd";
import emptyActivity from "../assets/emptyactivity.png";
import ActivityCard from "./ActivityCard";
import DeleteModal from "./ui/DeleteModal";

const baseUrl = import.meta.env.VITE_END_POINT;
const email = import.meta.env.VITE_EMAIL_DEV;

const ActivityHome = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchActivities() {
      try {
        const response = await fetch(
          `${baseUrl}/activity-groups?email=${email}`
        );
        const data = await response.json();
        if (isMounted) {
          setActivities(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchActivities();
    return () => {
      isMounted = false;
    };
  }, [activities]);

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
    <div className="mt-12 mx-auto">
      <div className="flex flex-row justify-between">
        <h1 data-cy="activity-title" className="text-5xl font-bold">
          Activity
        </h1>
        <ButtonAdd DataCy="activity-add-button" />
      </div>
      {activityRender}
    </div>
  );
};

export default ActivityHome;
