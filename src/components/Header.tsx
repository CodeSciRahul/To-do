import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import ListIcon from '@mui/icons-material/List';
import SmallDeviceSidebar from "./SmallDeviceSidebar";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelecter } from "../Redux/Hooks/store";
import { removeUserInfo } from "../Redux/feature/authSlice";
import ReorderIcon from '@mui/icons-material/Reorder';
import GridViewIcon from '@mui/icons-material/GridView';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setTheme, setView } from "../Redux/feature/uiSettingsSlice";

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  // Get the current theme and view from Redux store
  const theme = useAppSelecter((state) => state.uiSetting.theme);
  const view = useAppSelecter((state) => state.uiSetting.view);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar when ListIcon is clicked
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className={`${theme === "dark" ? "bg-gray-900 opacity-90" : " bg-white"} p-4 flex justify-between items-center`}>
      <div className="flex gap-2">
        <div className="block md:hidden">
          <IconButton onClick={handleSidebarToggle}>
            <ReorderIcon />
          </IconButton>
        </div>
        <h1 className="text-green-600 font-bold text-2xl">DoIt</h1>
      </div>
      <div className="flex items-center space-x-4">
        <IconButton>
          <Search />
        </IconButton>

        {/* Grid/List view toggle */}
        <IconButton onClick={() => dispatch(setView(view === "grid" ? "list" : "grid"))}>
          {view === "grid" ? (
            <GridViewIcon />
          ) : (
            <ListIcon/>
          )}
        </IconButton>

        {/* Dark/Light mode toggle */}
        <IconButton onClick={() => dispatch(setTheme(theme === "dark" ? "light" : "dark"))}>
          {theme === "dark" ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon/>
          )}
        </IconButton>

        {/* Logout */}
        <IconButton onClick={() => dispatch(removeUserInfo())}>
          <LogoutIcon />
        </IconButton>
      </div>

      {/* Conditionally render Sidebar */}
      {screenWidth < 768 && <SmallDeviceSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
    </header>
  );
};

export default Header;
