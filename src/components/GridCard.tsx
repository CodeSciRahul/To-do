import React from "react";
import { Checkbox, IconButton, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import {
  toggleTaskCompletion,
  toggleTaskStarred,
} from "../Redux/feature/todoSlice";

interface Step {
  id: number;
  description: string;
  completed: boolean;
}

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

interface TaskCardProps {
  task: Task;
}

const GridCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelecter((state) => state?.uiSetting?.theme); // Get theme from Redux

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-md transition-shadow duration-300 mb-4 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-600 text-white hover:shadow-lg"
          : "bg-white border-gray-300 text-gray-900 hover:shadow-md"
      }`}
    >
      {/* Left Section: Checkbox and Task Description */}
      <div className="flex items-center w-full">
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(toggleTaskCompletion(task.id))}
          inputProps={{ "aria-label": "Task Completion Checkbox" }}
        />
        <Typography
          className={`${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </Typography>
      </div>

      {/* Right Section: Star Icon */}
      <IconButton
        className={`text-red-500 ${theme === "dark" ? "hover:text-red-300" : ""}`}
        onClick={() => dispatch(toggleTaskStarred(task.id))}
      >
        {task?.star ? <StarIcon /> : <StarBorderOutlinedIcon />}
      </IconButton>
    </div>
  );
};

export default GridCard;
