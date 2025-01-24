import React, { useEffect } from "react";
import { Checkbox, IconButton, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import {
  toggleTaskCompletion,
  toggleTaskStarred,
  deleteTask, // Import deleteTask action
} from "../Redux/feature/todoSlice";
import { fetchWeather } from "../Redux/feature/wheatherSlice";

type TaskCardProps = {
  task: {
    id: number;
    title: string;
    completed: boolean;
    star: boolean;
    date: Date;
  };
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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
    // Fetch weather when component loads
    dispatch(fetchWeather(task.date.toISOString()));
  }, [task.date, dispatch]);

  return (
    <div
      className={`flex flex-col p-4 border-b-2 border-green-300 cursor-pointer ${
        theme === "dark" ? "hover:bg-green-400" : "hover:bg-green-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={task.completed}
            onChange={() => dispatch(toggleTaskCompletion(task.id))}
          />
          <Typography
            className={`${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </Typography>{" "}
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            className="text-red-500"
            onClick={() => dispatch(toggleTaskStarred(task.id))}
          >
            {task.star ? <StarIcon /> : <StarBorderOutlinedIcon />}
          </IconButton>

          {/* Delete Icon */}
          <IconButton
            className="text-red-500"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      {/* Weather Info */}
      {weather.loading && <Typography>Loading weather...</Typography>}
      {weather.error && <Typography>Error loading weather</Typography>}
      {weather.data && (
        <div className="mt-2">
          <Typography variant="subtitle2">
            Weather: {weather.data.weather[0].description}
          </Typography>
          <Typography variant="subtitle2">
            Temperature: {weather.data.main.temp}°C
          </Typography>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
