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
      // console.log(data);
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
  getActivities: async () => {
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
        `${baseUrl}/activity-groups`,
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
      // console.log("Item added successfully!");
    } catch (error) {
      console.error(error);
    }
  },
  fetchItemById: async (id) => {
    try {
      const response = await axios.get(`https://your-api-url.com/items/${id}`);
      set({ item: response.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useActivityStore;
