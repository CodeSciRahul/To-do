import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Step {
  id: number;
  description: string;
  completed: boolean;
}

interface Task {
  id: number;
  task: string;
  completed: boolean;
  star: boolean;
  Date?: string | null;
  reminder?: string | null;
  repeat?: string | null;
  steps?: Step[] | null;
}

interface TodoState {
  tasks: Task[];
}

// Helper Functions
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

// Initial State
const initialState: TodoState = {
  tasks: loadTasksFromLocalStorage(), // Load tasks from localStorage
};

// Redux Slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    toggleTaskStarred: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.star = !task.star;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setTaskReminder: (state, action: PayloadAction<{ id: number; reminder: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.reminder = action.payload.reminder;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setTaskRepeat: (state, action: PayloadAction<{ id: number; repeat: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.repeat = action.payload.repeat;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setTaskDate: (state, action: PayloadAction<{ id: number; date: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.Date = action.payload.date;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    addTaskStep: (state, action: PayloadAction<{ id: number; step: Step }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        if (!task.steps) task.steps = [];
        task.steps.push(action.payload.step);
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
});

export const {
  addTask,
  toggleTaskCompletion,
  toggleTaskStarred,
  setTaskReminder,
  setTaskRepeat,
  setTaskDate,
  addTaskStep,
} = todoSlice.actions;

export const selectTasks = (state: { todo: TodoState }) => state.todo.tasks;

export default todoSlice.reducer;
