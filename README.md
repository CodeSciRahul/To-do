# Task Manager App with Weather Integration

This project is a **Task Manager Application** built with **React**, **Redux**, and **Material-UI**. It provides a user-friendly interface for managing tasks with features such as task completion, starring tasks, and fetching weather data for tasks with specified dates.

## Features

- **Task Management**:
  - Mark tasks as completed.
  - Star important tasks.
  - Add additional details like reminders, repeat schedules, and steps for each task.
  
- **Dynamic Theme Support**:
  - Supports both dark and light themes.

- **Weather Integration**:
  - Fetches and displays weather data for tasks that have an associated date.

- **Responsive Design**:
  - Fully responsive UI built with **Material-UI** and **Tailwind CSS**.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) installed on your system.
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager.

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/CodeSciRahul/To-do.git

2. Install dependencies:
   ``` npm install

3. Create a .env file in the root directory and add your weather API key:
   ```
   VITE_API_KEY= <your_openweathermap_api_key>

4. Start the development server:
   ```
   npm run dev

### Folder structure

├── public/             # Public assets
├── src/
│   ├── Components/     # Reusable React components
│   │   ├── GridCard.tsx
│   │   └── ...
│   ├── Redux/          # Redux setup
│   │   ├── feature/    # Slices for task and weather functionality
│   │   ├── Hooks/      # Custom hooks for using Redux
│   │   └── store.ts    # Redux store configuration
│   ├── App.tsx         # Main application entry
│   └── index.tsx       # React entry point
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation



