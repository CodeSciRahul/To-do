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
  Date?: string | Date;
  reminder?: string;
  repeat?: string;
  steps?: Step[];
}

interface TodoState {
  tasks: Task[];
}

// Helper Functions
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
    return tasks.map((task: Task) => ({
      ...task,
      Date: task.Date ? new Date(task.Date) : undefined, // Convert back to Date object
    }));
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
    // Add a new task
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
      if (newTask.Date && newTask.Date instanceof Date) {
        newTask.Date = newTask.Date.toISOString(); // Convert Date to string
      }
      state.tasks.push(newTask);
      saveTasksToLocalStorage(state.tasks); // Update localStorage
    },
    
    // Toggle completion status of a task
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks); // Update localStorage
      }
    },

    // Toggle starred status of a task
    toggleTaskStarred: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.star = !task.star;
        saveTasksToLocalStorage(state.tasks); // Update localStorage
      }
    },

    // Set reminder for a task
    setTaskReminder: (state, action: PayloadAction<{ id: number; reminder: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.reminder = action.payload.reminder;
        saveTasksToLocalStorage(state.tasks); // Update localStorage
      }
    },

    // Set repeat pattern for a task
    setTaskRepeat: (state, action: PayloadAction<{ id: number; repeat: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.repeat = action.payload.repeat;
        saveTasksToLocalStorage(state.tasks); // Update localStorage
      }
    },

    // Set a date for the task
    setTaskDate: (state, action: PayloadAction<{ id: number; date: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.Date = new Date(action.payload.date); // Convert string to Date object
        saveTasksToLocalStorage(state.tasks); // Update localStorage
      }
    },

    // Add a step to a task
    addTaskStep: (state, action: PayloadAction<{ id: number; step: Step }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        if (!task.steps) task.steps = [];
        task.steps.push(action.payload.step);
        saveTasksToLocalStorage(state.tasks); // Update localStorage
      }
    },

    // Delete a task by its ID
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks); // Update localStorage after deleting
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
  deleteTask
} = todoSlice.actions;

export const selectTasks = (state: { todo: TodoState }) => state.todo.tasks;

export default todoSlice.reducer;
