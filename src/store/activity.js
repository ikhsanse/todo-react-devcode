import { create } from "zustand";

const baseUrl = import.meta.env.VITE_END_POINT;
const email = import.meta.env.VITE_EMAIL_DEV;

const useActivityStore = create((set) => ({
  activities: [],
  message: "",
  setActivities: (activities) => set({ activities }),
  setMessage: (message) => set(() => ({ message })),
  deleteActivity: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/activity-groups/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data); // Optional: Log the response data
      set((state) => ({
        activities: state.activities.filter((activity) => activity.id !== id),
        message: 'Activity berhasil dihapus'
      }));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  fetchActivities: async () => {
    try {
      const response = await fetch(`${baseUrl}/activity-groups?email=${email}`);
      const data = await response.json();
      set({ activities: data.data });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  addActivity: async () => {
    try {
      const response = await fetch(
        "https://todo.api.devcode.gethired.id/activity-groups",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: "New Activity", email: email }),
        }
      );

      const data = await response.json();
      set((state) => ({ activities: [data, ...state.activities] }));
      console.log("Item added successfully!");
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useActivityStore;
