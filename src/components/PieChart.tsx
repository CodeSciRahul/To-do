import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { Card, Typography } from "@mui/material";

import { useAppSelecter } from "../Redux/Hooks/store";
import { selectTasks } from "../Redux/feature/todoSlice";

export const CustomPieChart = () => {
  const tasks = useAppSelecter(selectTasks); // Get the list of tasks from Redux store
  const pendingCount = tasks.filter((task) => !task.completed).length; // Count tasks that are not completed
  const doneCount = tasks.filter((task) => task.completed).length; // Count tasks that are completed

  const taskStats = [
    { name: "Pending", value: pendingCount },
    { name: "Done", value: doneCount },
  ]; // Data for the pie chart

  const COLORS = ["#4CAF50", "#2E7D32"]; // Color scheme for the chart

  return (
    <>
      <Card variant="outlined" className="p-4 mb-4">
        <Typography variant="h6" className="text-center font-semibold mb-2">
          Today Tasks
        </Typography>
        <RechartsPieChart width={200} height={200}>
          <Pie
            data={taskStats} // Pie chart data
            dataKey="value" // Key to bind the data
            nameKey="name" // Key for legend labels
            cx="50%" // Center of the pie chart (x-axis)
            cy="50%" // Center of the pie chart (y-axis)
            outerRadius={60} // Radius of the outer circle
            fill="#8884d8" // Default fill color
            label // Show labels on the pie slices
          >
           {taskStats.map((entry, index) => (
  <Cell
    key={`cell-${index}`}
    fill={COLORS[index % COLORS.length]} // Apply color based on index
    name={entry.name} // Using entry for its 'name' property (if needed)

  />
))}

          </Pie>
          <Tooltip /> {/* Tooltip to show details on hover */}
          <Legend verticalAlign="bottom" height={36} /> {/* Legend at the bottom */}
        </RechartsPieChart>
        <Typography variant="body2" className="text-center mt-2">
          {/* Display the task count for Pending and Done tasks */}
          <span style={{ color: COLORS[0] }}>●</span> Pending:{" "}
          {taskStats[0].value} &nbsp;
          <span style={{ color: COLORS[1] }}>●</span> Done: {taskStats[1].value}
        </Typography>
      </Card>
    </>
  );
};
