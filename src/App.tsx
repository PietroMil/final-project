import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./pages/HomeUser";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import DetailPage from "./pages/DetailPage";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/auth/ProtectedPage";
import { selecTheme } from "./theme/theme.slice";
import { useAppSelector } from "./store/hooks";
import Watching from "./pages/Watching";

initializeApp(config.firebaseConfig);

export interface InputAppProps {}

const App: React.FunctionComponent<InputAppProps> = () => {
  const theme = useAppSelector(selecTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("bg-black");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("bg-black");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:showId"
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />

        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/watching" element={<ProtectedRoute><Watching /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
