import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import SmallDeviceSidebar from "./SmallDeviceSidebar"; // Sidebar for small screens
import LogoutIcon from '@mui/icons-material/Logout'; // Logout icon
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store"; // Custom hooks to interact with Redux store
import { removeUserInfo } from "../Redux/feature/authSlice"; // Action to remove user info (log out)
import ReorderIcon from '@mui/icons-material/Reorder';
import GridViewIcon from '@mui/icons-material/GridView';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode'; 
import { setTheme, setView } from "../Redux/feature/uiSettingsSlice";

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage the sidebar visibility
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // State to track screen width

  // Get the current theme and view from the Redux store
  const theme = useAppSelecter((state) => state.uiSetting.theme); // Current theme (light or dark)
  const view = useAppSelecter((state) => state.uiSetting.view); // Current view (grid or list)

  const dispatch = useAppDispatch(); // Dispatch function to dispatch Redux actions

  useEffect(() => {
    // Handler to update screen width on window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for resizing window
    window.addEventListener('resize', handleResize);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures it only runs once on mount and unmount

  // Toggle sidebar visibility when the menu icon (ReorderIcon) is clicked
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className={`${theme === "dark" ? "bg-gray-900 opacity-90" : "bg-white"} p-4 flex justify-between items-center`}>
      <div className="flex gap-2">
        {/* Sidebar toggle button (only visible on small screens) */}
        <div className="block md:hidden">
          <IconButton onClick={handleSidebarToggle}>
            <ReorderIcon />
          </IconButton>
        </div>
        <h1 className="text-green-600 font-bold text-2xl">DoIt</h1> {/* App title */}
      </div>
      <div className="flex items-center space-x-4">

        {/* Toggle between Grid and List view */}
        <IconButton onClick={() => dispatch(setView(view === "grid" ? "list" : "grid"))}>
          {view === "grid" ? ( // Check current view and toggle accordingly
            <GridViewIcon />
          ) : (
            <ListIcon/>
          )}
        </IconButton>

        {/* Toggle between Dark and Light mode */}
        <IconButton onClick={() => dispatch(setTheme(theme === "dark" ? "light" : "dark"))}>
          {theme === "dark" ? ( // Check current theme and toggle accordingly
            <DarkModeIcon />
          ) : (
            <LightModeIcon/>
          )}
        </IconButton>

        {/* Logout button */}
        <IconButton onClick={() => dispatch(removeUserInfo())}>
          <LogoutIcon />
        </IconButton>
      </div>

      {/* Conditionally render the sidebar for small screens (below 768px) */}
      {screenWidth < 768 && <SmallDeviceSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
    </header>
  );
};

export default Header; // Export the Header component for use in other parts of the app
