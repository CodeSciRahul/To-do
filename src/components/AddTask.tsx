import { useState } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import { addTask } from "../Redux/feature/todoSlice";
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const AddTask = () => {
  const dispatch = useAppDispatch(); // Hook to dispatch actions to Redux store
  const theme = useAppSelecter((state) => state?.uiSetting?.theme); // Hook to get current theme from Redux store

  // State variables for form inputs
  const [newTask, setNewTask] = useState(""); // New task description
  const [reminder, setReminder] = useState(""); // Reminder text
  const [repeat, setRepeat] = useState(""); // Repeat frequency
  const [dueDate, setDueDate] = useState<Date | null>(null); // Due date for the task
  const [step, setStep] = useState(""); // Step details for task

  // State variables to toggle visibility of components (Calendar, Reminder, Repeat)
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  // Handle adding the task to the Redux store
  const handleAddTask = () => {
    // Only add the task if the input is not empty
    if (newTask.trim()) {
      // Dispatching an action to add a new task to the store
      dispatch(
        addTask({
          id: Date.now(), // Unique id using timestamp
          task: newTask, // Task description
          completed: false, // Initially, the task is not completed
          star: false, // Task is not starred by default
          Date: dueDate // Due date (if set)
            ? new Date(
                dueDate.getFullYear(),
                dueDate.getMonth(),
                dueDate.getDate()
              )
            : undefined, // If no due date, it will be undefined
          reminder: reminder, // Reminder (if set)
          repeat: repeat, // Repeat frequency (if set)
          steps: step
            ? [{ id: Date.now(), description: step, completed: false }] // Steps for the task, if any
            : [],
        })
      );
      // Reset state variables after adding the task
      setNewTask(""); 
      setReminder("");
      setRepeat("");
      setDueDate(null);
      setStep("");
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-green-200 text-black"
      } my-4 p-4 rounded-md`} // Apply dynamic classes based on theme
    >
      {/* Textarea input for the new task */}
      <textarea
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)} // Update state on input change
        rows={2}
        className="w-full focus:outline-0 p-6"
        placeholder="Add a new task..."
      ></textarea>

      <List className="flex items-center space-x-4">
        <ListItem component="li" className="flex items-center space-x-2">
          {/* Calendar Icon for selecting due date */}
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`} 
            onClick={() => setShowCalendar((prev) => !prev)} // Toggle calendar visibility
          >
            <CalendarMonth />
          </IconButton>
          {showCalendar && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)} // Update due date state
                renderInput={(params) => <TextField {...params} size="small" className="w-20" placeholder="Due Date" />}
              />
            </LocalizationProvider>
          )}

          {/* Reminder Icon for setting a reminder */}
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`} 
            onClick={() => setShowReminder((prev) => !prev)} // Toggle reminder visibility
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          {showReminder && (
            <TextField
              value={reminder}
              onChange={(e) => setReminder(e.target.value)} // Update reminder state
              placeholder="Set Reminder"
              size="small"
              className="w-32"
            />
          )}

          {/* Repeat Icon for selecting repeat frequency */}
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`} 
            onClick={() => setShowRepeat((prev) => !prev)} // Toggle repeat visibility
          >
            <RepeatIcon />
          </IconButton>
          {showRepeat && (
            <Select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)} // Update repeat state
              displayEmpty
              size="small"
              className="w-32"
            >
              {/* Menu items for repeat options */}
              <MenuItem value="">No Repeat</MenuItem>
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          )}
        </ListItem>

        {/* Button to add the task */}
        <Button
          variant="outlined"
          className="px-4 h-fit mt-7"
          onClick={handleAddTask} // Call the handleAddTask function when clicked
        >
          Add
        </Button>
      </List>
    </div>
  );
};
