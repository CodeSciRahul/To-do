// File: src/components/Sidebar.tsx
import React, { useState } from "react";
import { Home, Star, CalendarToday, Assignment, Add } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
} from "@mui/material";
import { CustomPieChart } from "./PieChart";
import { useNavigate } from "react-router-dom";
import { useAppSelecter } from "../Redux/Hooks/store";

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>("All Tasks");
  const themeValue = useAppSelecter((state) => state?.uiSetting?.theme)
  const navigate = useNavigate();

  return (
    <div className={`w-64 ${themeValue === "dark" ? "bg-gray-800 opacity-90" : " bg-green-200"} h-full scroll-auto px-4 shadow-md`}>
      <div className="p-4 text-center">
        <Avatar
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="mx-auto w-24 h-24"
        />
        <h2 className="mt-2 text-lg font-semibold">Hey, ABCD</h2>
      </div>

      {/* Navigation List */}
      <Card variant="outlined">
        <List>
          {[
            { text: "All Tasks", icon: <Home /> },
            { text: "Today", icon: <CalendarToday /> },
            { text: "Important", icon: <Star /> },
            { text: "Assigned to Me", icon: <Assignment /> },
          ].map((item, index) => (
            <ListItem
              component="li"
              key={index}
              className={`cursor-pointer rounded-xl ${
                active === item.text && "bg-green-300"
              }`}
              onClick={() => {
                navigate(`?filter=${item?.text}`);
                setActive(item.text)}
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Add List Button */}
      <Card variant="outlined" className="flex mt-2 py-2">
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
  );
};

export default Sidebar;
