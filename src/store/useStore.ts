import { create } from "zustand";
import type { Task, Status } from "../types/task";
import { generateTasks } from "../utils/dataGenerator";

interface User {
  id: string;
  color: string;
  taskId: string;
}

interface Filters {
  status: string[];
  priority: string[];
  assignee: string[];
}

interface Store {
  tasks: Task[];
  allTasks: Task[];
  users: User[];
  filters: Filters;

  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: string, status: Status) => void;

  setFilters: (filters: Partial<Filters>) => void;
  applyFilters: () => void;
  clearFilters: () => void;

  simulateUsers: () => void;
}


let interval: ReturnType<typeof setInterval> | null = null;


const initialTasks = generateTasks(500);

export const useStore = create<Store>((set, get) => ({
  tasks: initialTasks,
  allTasks: initialTasks,

  users: [
    { id: "u1", color: "bg-red-500", taskId: "1" },
    { id: "u2", color: "bg-green-500", taskId: "2" },
    { id: "u3", color: "bg-blue-500", taskId: "3" },
  ],

  filters: {
    status: [],
    priority: [],
    assignee: [],
  },


  setTasks: (tasks: Task[]) => set({ tasks }),

  updateTaskStatus: (id: string, status: Status) =>
    set((state: Store) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
      allTasks: state.allTasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  setFilters: (newFilters: Partial<Filters>) =>
    set((state: Store) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  applyFilters: () => {
    const { allTasks, filters } = get();

    let filtered = [...allTasks];

    if (filters.status.length) {
      filtered = filtered.filter((t) => filters.status.includes(t.status));
    }

    if (filters.priority.length) {
      filtered = filtered.filter((t) => filters.priority.includes(t.priority));
    }

    if (filters.assignee.length) {
      filtered = filtered.filter((t) => filters.assignee.includes(t.assignee));
    }

    set({ tasks: filtered });
  },

  clearFilters: () => {
    const { allTasks } = get();

    set({
      tasks: allTasks,
      filters: {
        status: [],
        priority: [],
        assignee: [],
      },
    });
  },

  simulateUsers: () => {
    if (interval) return;

    interval = setInterval(() => {
      const { tasks } = get();

      if (!tasks.length) return;

      set((state: Store) => ({
        users: state.users.map((u) => ({
          ...u,
          taskId: tasks[Math.floor(Math.random() * tasks.length)].id,
        })),
      }));
    }, 3000);
  },
}));
