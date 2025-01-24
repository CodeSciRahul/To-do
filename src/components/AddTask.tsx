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

  const [newTask, setNewTask] = useState(""); // New task description
  const [reminder, setReminder] = useState(""); // Reminder text
  const [repeat, setRepeat] = useState(""); // Repeat frequency
  const [dueDate, setDueDate] = useState<Date | null>(null); // Due date for the task
  const [step, setStep] = useState(""); // Step details for task

  const [showCalendar, setShowCalendar] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          task: newTask,
          completed: false,
          star: false,
          Date: dueDate
            ? new Date(
                dueDate.getFullYear(),
                dueDate.getMonth(),
                dueDate.getDate()
              )
            : undefined,
          reminder: reminder,
          repeat: repeat,
          steps: step
            ? [{ id: Date.now(), description: step, completed: false }]
            : [],
        })
      );
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
      } my-4 p-4 rounded-md`}
    >
      <textarea
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        rows={2}
        className="w-full focus:outline-0 p-6"
        placeholder="Add a new task..."
      ></textarea>

      <List className="flex items-center space-x-4">
        <ListItem component="li" className="flex items-center space-x-2">
          <IconButton
            className={`${
              theme === "dark" ? "text-white" : "text-red-500"
            }`}
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <CalendarMonth />
          </IconButton>
          {showCalendar && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    className: "w-34",
                    placeholder: "Due Date",
                  },
                }}
              />
            </LocalizationProvider>
          )}

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
