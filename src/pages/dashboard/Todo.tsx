import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TaskList from "../../components/TaskList";
import { useAppSelecter } from "../../Redux/Hooks/store";

export const Todo: React.FC = () => {
  const themeValue = useAppSelecter((state) => state?.uiSetting?.theme)
  return (
    <>
        <div className="">
      <div className=""><Header /></div>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
      <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${themeValue === "dark" ? "bg-gray-700 text-white" : ""} `}>
        <main className="p-4 overflow-y-auto">
          <TaskList />
        </main>
      </div>
    </div>
    </div>
    </>
  )
}