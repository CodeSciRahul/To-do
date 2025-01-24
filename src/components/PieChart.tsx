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
  const tasks = useAppSelecter(selectTasks);
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const doneCount = tasks.filter((task) => task.completed).length;

  const taskStats = [
    { name: "Pending", value: pendingCount },
    { name: "Done", value: doneCount },
  ];

  const COLORS = ["#4CAF50", "#2E7D32"]; 
  return (
    <>
      <Card variant="outlined" className="p-4 mb-4">
        <Typography variant="h6" className="text-center font-semibold mb-2">
          Today Tasks
        </Typography>
        <RechartsPieChart width={200} height={200}>
          <Pie
            data={taskStats}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            label
          >
            {taskStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </RechartsPieChart>
        <Typography variant="body2" className="text-center mt-2">
          <span style={{ color: COLORS[0] }}>●</span> Pending:{" "}
          {taskStats[0].value} &nbsp;
          <span style={{ color: COLORS[1] }}>●</span> Done: {taskStats[1].value}
        </Typography>
      </Card>
    </>
  );
};
