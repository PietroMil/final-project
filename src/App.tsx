import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./pages/HomeUser";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { initializeApp } from "firebase/app";
import { config, app } from "./config/config";
import DetailPage from "./pages/DetailPage";
import Favorites from "./pages/Favorites";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/auth/ProtectedPage";
import { selecTheme } from "./theme/theme.slice";
import { useAppSelector } from "./store/hooks";

initializeApp(config.firebaseConfig);

const auth = getAuth(app);

//motoring user status
onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid, displayName } = user;
    const currentUser = { uid, displayName };
    localStorage.setItem("user", JSON.stringify(currentUser));
  } else {
    localStorage.setItem("user", "");
  }
});

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
        <Route path="/" element={<HomeUser />} />
        <Route
          path="/:showId"
          element={
            <ProtectedRoute
              user={JSON.parse(
                localStorage.getItem("user") || '{"uid": false}'
              )}
            >
              <DetailPage />
            </ProtectedRoute>
          }
        />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
