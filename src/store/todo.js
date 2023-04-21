import { create } from "zustand";

const baseUrl = import.meta.env.VITE_END_POINT;

const useTodoStore = create((set) => ({
  todos: [],
  message: "",
  setMessage: (message) => set(() => ({ message })),
  fetchTodos: async (activityId) => {
    try {
      const response = await fetch(
        `${baseUrl}/todo-items?activity_group_id=${activityId}`
      );
      const data = await response.json();
      set({ todos: data.data });
    } catch (error) {
      console.error(error);
    }
  },
  deleteTodo: async (todoId) => {
    try {
      await fetch(`${baseUrl}/todo-items/${todoId}`, {
        method: "DELETE",
      });
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId),
        message: "Item berhasil dihapus",
      }));
    } catch (error) {
      console.error(error);
    }
  },
  addTodo: async (todoData) => {
    try {
      const response = await fetch(`${baseUrl}/todo-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      const newTodo = await response.json();
      set((state) => ({
        todos: [newTodo, ...state.todos],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateTodoIsActive: async (todoId, isActive) => {
    try {
      const response = await fetch(`${baseUrl}/todo-items/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: isActive }),
      });
      const updatedTodo = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        ),
      }));
      // window.location.reload
    } catch (error) {
      console.error(error);
    }
  },
  updateTodo: async (todoId, newTitle, newPriority) => {
    try {
      const response = await fetch(`${baseUrl}/todo-items/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          priority: newPriority,
        }),
      });
      const updatedTodo = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  sortTodosByIdAscending: () => {
    set((state) => ({
      todos: [...state.todos].sort((a, b) => a.id - b.id),
    }));
  },
  sortTodosByIdDescending: () => {
    set((state) => ({
      todos: [...state.todos].sort((a, b) => b.id - a.id),
    }));
  },
  sortByTitleAsc: () => {
    set((state) => ({
      todos: state.todos.slice().sort((a, b) => a.title.localeCompare(b.title)),
    }));
  },
  sortByTitleDesc: () => {
    set((state) => ({
      todos: state.todos.slice().sort((a, b) => b.title.localeCompare(a.title)),
    }));
  },
  sortTodosByIsActive: () => {
    set((state) => ({
      todos: state.todos.sort((a, b) => {
        if (a.is_active === b.is_active) {
          return 0;
        } else if (a.is_active === 0) {
          return 1;
        } else {
          return -1;
        }
      }),
    }));
  },
}));

export default useTodoStore;
