// File: src/components/TaskDetails.tsx
import React, { useState } from "react";
import { IconButton, TextField, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RepeatIcon from "@mui/icons-material/Repeat";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Step {
  id: number;
  description: string;
  completed: boolean;
}

interface TaskDetailsProps {
  task: {
    id: number;
    task: string;
    completed: boolean;
    star: boolean;
    steps?: Step[] | null;
  };
  onAddStep: (step: Step) => void;
  onDeleteTask: (id: number) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onAddStep, onDeleteTask }) => {
  const [steps, setSteps] = useState<Step[]>(task.steps || []);
  const [newStep, setNewStep] = useState("");
  const [reminder, setReminder] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  const handleAddStep = () => {
    if (newStep.trim()) {
      const newStepObj: Step = {
        id: steps.length + 1,
        description: newStep,
        completed: false,
      };
      setSteps((prev) => [...prev, newStepObj]);
      onAddStep(newStepObj);
      setNewStep("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md">
      {/* Task Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Checkbox checked={task.completed} />
          <span className="text-lg font-medium">{task.task}</span>
        </div>
        <IconButton aria-label="Star Task">
          <AddIcon />
        </IconButton>
      </div>

      {/* Add Step */}
      <div className="flex items-center gap-2 mb-4">
        <AddIcon className="text-gray-600" />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Add Step"
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddStep} variant="contained" color="primary">
          Add
        </Button>
      </div>

      {/* Set Reminder */}
      <div className="flex items-center gap-2 mb-4">
        <NotificationsIcon className="text-gray-600" />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Set Reminder"
            value={reminder}
            onChange={(newValue) => setReminder(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </div>

      {/* Add Due Date */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarTodayIcon className="text-gray-600" />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Add Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </div>

      {/* Repeat */}
      <div className="flex items-center gap-2 mb-4">
        <RepeatIcon className="text-gray-600" />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Repeat"
          fullWidth
        />
      </div>

      {/* Add Notes */}
      <div className="flex items-center gap-2 mb-4">
        <TextField
          label="Add Notes"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-gray-600">
        <span>Created Today</span>
        <IconButton onClick={() => onDeleteTask(task.id)} aria-label="Delete Task">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskDetails;
