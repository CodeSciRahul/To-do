import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Todo } from "./pages/dashboard/Todo";
import Login from "./pages/auth/login";
import { ThemeProvider } from "@mui/material";
import { darkTheme,lightTheme } from "./Theme";
import {useAppSelecter } from "./Redux/Hooks/store";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";


const App: React.FC = () => {
  const themeValue = useAppSelecter((state) => state?.uiSetting?.theme)
  const isAuthenticated = useAppSelecter((state) => state?.auth?.user)
  return (
    <>
    <Router basename="/">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path=""
          element={
            <ThemeProvider theme={themeValue === "dark" ? darkTheme : lightTheme}>
              <ProtectedRoute isAuthenticated={isAuthenticated ? true : false}>
                <Todo />
              </ProtectedRoute>
            </ThemeProvider>
          }
        />
      </Routes>
    </Router>
 
    </>
    
  );
};

export default App;
