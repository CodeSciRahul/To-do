import React, { useEffect } from "react";
import { Checkbox, IconButton, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import { toggleTaskCompletion, toggleTaskStarred, deleteTask } from "../Redux/feature/todoSlice";
import { fetchWeather } from "../Redux/feature/wheatherSlice";

// Interface for step object
interface Step {
  id: number;
  description: string;
  completed: boolean;
}

// Interface for task object
interface Task {
  id: number;
  title: string;
  completed: boolean;
  star: boolean;
  Date?: string | null;
  reminder?: string | null;
  repeat?: string | null;
  steps?: Step[] | null;
}

// Props interface for GridCard component
interface TaskCardProps {
  task: Task;
}

const GridCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelecter((state) => state?.uiSetting?.theme);
  const weather = useAppSelecter((state) => state.weather) as {
    loading: boolean;
    error: string | null;
    data: {
      weather: { description: string }[];
      main: { temp: number };
    } | null;
  };

  useEffect(() => {
    if (task.Date) {
      const date = new Date(task.Date);
      dispatch(fetchWeather(date.toISOString()));
    }
  }, [task.Date, dispatch]);

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-md transition-shadow duration-300 mb-4 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-600 text-white hover:shadow-lg"
          : "bg-white border-gray-300 text-gray-900 hover:shadow-md"
      }`}
    >
      <div className="flex items-center w-full">
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(toggleTaskCompletion(task.id))}
        />
        <Typography className={`${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </Typography>

        {weather.loading && (
          <Typography className="ml-4 text-sm text-gray-500">Loading weather...</Typography>
        )}
        {weather.error && (
          <Typography className="ml-4 text-sm text-red-500">Error loading weather</Typography>
        )}
        {weather.data && (
          <div className="ml-4 mt-2 p-2">
            <Typography variant="subtitle2" className="text-sm text-gray-700">
              Weather: <span className="font-semibold">{weather.data.weather[0].description}</span>
            </Typography>
            <Typography variant="subtitle2" className="text-sm text-gray-700">
              Temperature: <span className="font-semibold">{weather.data.main.temp}°C</span>
            </Typography>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <IconButton
          className={`text-red-500 ${theme === "dark" ? "hover:text-red-300" : ""}`}
          onClick={() => dispatch(toggleTaskStarred(task.id))}
        >
          {task?.star ? <StarIcon /> : <StarBorderOutlinedIcon />}
        </IconButton>

        {/* Delete Icon */}
        <IconButton
          className="text-red-500"
          onClick={() => dispatch(deleteTask(task.id))} // Dispatch delete action
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default GridCard;
