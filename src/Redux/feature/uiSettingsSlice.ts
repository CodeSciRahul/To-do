import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for Task and Step
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

// Define interfaces for Theme and View
interface ThemeViewState {
  theme: "dark" | "light"; // "dark" or "light"
  view: "grid" | "list";  // "grid" or "list"
  selectedTask: Task | null;
}

const storedTheme = localStorage.getItem('theme');
const storedView = localStorage.getItem('view');

// Set initial state, reading from localStorage if available
const initialState: ThemeViewState = {
  theme: storedTheme ? (JSON.parse(storedTheme) as "dark" | "light") : "light",
  view: storedView ? (JSON.parse(storedView) as "grid" | "list") : "list",
  selectedTask: null,
};

export const themeViewSlice = createSlice({
  initialState,
  name: 'themeView',

  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },

    setView: (state, action: PayloadAction<"grid" | "list">) => {
      state.view = action.payload;
      localStorage.setItem("view", JSON.stringify(action.payload));
    },

    setSelectedTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
    },
  },
});

export const { setTheme, setView, setSelectedTask } = themeViewSlice.actions;
export default themeViewSlice.reducer;
