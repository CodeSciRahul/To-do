import { Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import GridCard from "./GridCard";
import { selectTasks } from "../Redux/feature/todoSlice";
import { useAppSelecter } from "../Redux/Hooks/store";
import { AddTask } from "./AddTask";
import { useLocation } from "react-router-dom";

const TaskList: React.FC = () => {
  const tasks = useAppSelecter(selectTasks);
  const view = useAppSelecter((state) => state?.uiSetting?.view);
  const location = useLocation();

  // Extract the filter type from the URL query params
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter"); // "All Tasks", "Today", "Important"

  // Filter tasks based on the URL filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Today") {
      // Check if task.Date is a valid date string or object
      const taskDate = task.Date ? new Date(task.Date) : null;
      if (taskDate === null || isNaN(taskDate.getTime())) {
        return false; // Invalid date, skip this task
      }
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      return taskDate.toISOString().split("T")[0] === today;
    }
    if (filter === "Important") {
      // Show tasks with star: true
      return task.star;
    }
    // Default: show all tasks
    return !task.completed;
  });

  return (
    <div>
      <Typography variant="h6" className="font-bold border-b-2 border-green-300">
        {filter === "Important" ? "Important Tasks" : filter === "Today" ? "Today's Tasks" : "To Do"}
      </Typography>

      <AddTask />

      {/* Display filtered tasks */}
      <div className={`space-y-2 ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}`}>
        {filteredTasks.map((task) =>
          view === "grid" ? (
            <GridCard
              key={task.id}
              task={{
                id: task.id,
                title: task.task,
                completed: task.completed,
                star: task.star,
              }}
            />
          ) : (
            <TaskCard
              key={task.id}
              task={{
                id: task.id,
                title: task.task,
                completed: task.completed,
                star: task.star,
                date: task?.Date ? new Date(task.Date) : new Date()
              }}
            />
          )
        )}
      </div>

      {/* Display completed tasks */}
      {filter !== "Important" && (
        <div className="mt-8">
          <Typography variant="h6" className="font-bold">
            Completed
          </Typography>
          <div className={`space-y-2 ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}`}>
            {tasks
              .filter((task) => task.completed)
              .map((task) =>
                view === "grid" ? (
                  <GridCard
                    key={task.id}
                    task={{
                      id: task.id,
                      title: task.task,
                      completed: task.completed,
                      star: task.star,
                    }}
                  />
                ) : (
                  <TaskCard
                    key={task.id}
                    task={{
                      id: task.id,
                      title: task.task,
                      completed: task.completed,
                      star: task.star,
                      date: task?.Date ? new Date(task.Date) : new Date()
                    }}
                  />
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
