import { useState } from "react";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import { addTask } from "../Redux/feature/todoSlice";
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const AddTask = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelecter((state) => state?.uiSetting?.theme); // Get the current theme
  
  const [newTask, setNewTask] = useState("");
  const [reminder, setReminder] = useState("");
  const [repeat, setRepeat] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [step, setStep] = useState("");

  // States to toggle visibility
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          task: newTask,
          completed: false,
          star: false,
          Date: dueDate || null,
          reminder: reminder || null,
          repeat: repeat || null,
          steps: step ? [{ id: Date.now(), description: step, completed: false }] : [],
        })
      );
      setNewTask(""); // Reset inputs
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
      } my-4 p-4 rounded-md`} // Apply background and text color based on theme
    >
      {/* Input for adding new task */}
      <textarea
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        rows={2}
        className="w-full focus:outline-0 p-6"
        placeholder="Add a new task..."
      ></textarea>

      <List className="flex items-center space-x-4">
        <ListItem component="li" className="flex items-center space-x-2">
          {/* Calendar Icon */}
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`} // Change icon color based on theme
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <CalendarMonth />
          </IconButton>
          {showCalendar && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    className="w-32"
                    placeholder="Due Date"
                  />
                )}
              />
            </LocalizationProvider>
          )}

          {/* Reminder Icon */}
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`}
            onClick={() => setShowReminder((prev) => !prev)}
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          {showReminder && (
            <TextField
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              placeholder="Set Reminder"
              size="small"
              className="w-32"
            />
          )}

          {/* Repeat Icon */}
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`}
            onClick={() => setShowRepeat((prev) => !prev)}
          >
            <RepeatIcon />
          </IconButton>
          {showRepeat && (
            <Select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              displayEmpty
              size="small"
              className="w-32"
            >
              <MenuItem value="">No Repeat</MenuItem>
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          )}
        </ListItem>

        <Button
          variant="outlined"
          className="px-4 h-fit mt-7"
          onClick={handleAddTask}
        >
          Add
        </Button>
      </List>
    </div>
  );
};
