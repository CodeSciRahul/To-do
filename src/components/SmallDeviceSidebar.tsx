import React, { useState, useEffect } from "react";
import { Home, Star, CalendarToday, Add } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Card } from "@mui/material";
import { CustomPieChart } from "./PieChart";
import { useNavigate } from "react-router-dom";
import { useAppSelecter } from "../Redux/Hooks/store"; // Import the useAppSelector hook

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const SmallDeviceSidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [active, setActive] = useState<string>("All Tasks");
  const navigate = useNavigate();

  // Get the current theme from Redux store
  const theme = useAppSelecter((state) => state?.uiSetting?.theme);
  const user = useAppSelecter((state) => state?.auth?.user)

  // Close sidebar when user clicks outside or presses escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-700 bg-opacity-90 transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-72 h-full scroll-auto p-4 shadow-md transform transition-all duration-300 ${
          theme === "dark" ? "bg-gray-950 text-white" : "bg-green-200 text-black"
        }`} // Conditional styles based on theme
        onClick={(e) => e.stopPropagation()} // Prevent closing sidebar on inner click
      >
        <div className="p-4 text-center">
          <Avatar
            src="https://via.placeholder.com/100"
            alt={`${user?.userName}`}
            className="mx-auto w-24 h-24"
          />
          <h2 className="mt-2 text-lg font-semibold">Hey, {user?.userName}</h2>
        </div>

        {/* Navigation List */}
        <Card
          variant="outlined"
          className={`${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
          }`} // Conditional styles for Card
        >
          <List>
            {[
              { text: "All Tasks", icon: <Home /> },
              { text: "Today", icon: <CalendarToday /> },
              { text: "Important", icon: <Star /> },
            ].map((item, index) => (
              <ListItem
                component="li"
                key={index}
                className={`cursor-pointer rounded-xl ${
                  active === item.text && "bg-green-300"
                } ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-green-200"}`} // Hover effect based on theme
                onClick={() => {
                navigate(`?filter=${item?.text}`);
                  setActive(item.text);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Card>

        {/* Add List Button */}
        <Card
          variant="outlined"
          className={`flex mt-2 py-2 ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
          }`} // Conditional styles for the Add List button
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add List" />
        </Card>

        {/* Custom Pie Chart */}
        <div className="mt-2">
          <CustomPieChart />
        </div>
      </div>
    </div>
  );
};

export default SmallDeviceSidebar;
