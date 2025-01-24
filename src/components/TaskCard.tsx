import React from "react";
import { Checkbox, Typography, IconButton } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import {
  toggleTaskCompletion,
  toggleTaskStarred,
} from "../Redux/feature/todoSlice";

type TaskCardProps = {
  task: { id: number; title: string; completed: boolean; star: boolean };
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelecter((state) => state?.uiSetting?.theme); // Get current theme from Redux

  return (
    <div
      className={`flex items-center justify-between p-2 border-b-2 border-green-300 cursor-pointer ${
        theme === "dark" ? "hover:bg-green-400" : "hover:bg-green-100"
      }`}
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(toggleTaskCompletion(task.id))}
        />
        <Typography>{task.title}</Typography>
      </div>
      <IconButton
        className="text-red-500"
        onClick={() => dispatch(toggleTaskStarred(task.id))}
      >
        {task?.star ? <StarIcon /> : <StarBorderOutlinedIcon />}
      </IconButton>
    </div>
  );
};

export default TaskCard;
