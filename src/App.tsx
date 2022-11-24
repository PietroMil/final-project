import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./pages/HomeUser";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/auth/AuthRoute"
import DetailPage from "./pages/DetailPage";
import Features from "./pages/Features";
import AuthRouteFeatures from "./components/auth/AuthRouteFeatures";


initializeApp(config.firebaseConfig)


export interface InputAppProps {}

const App: React.FunctionComponent<InputAppProps> = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomeUser />
            </AuthRoute>
          }
        />
        <Route
          path="/:showId"
          element={
            <AuthRoute>
              <DetailPage />
            </AuthRoute>
          }
          />
        <Route
          path="/features"
          element={
            <AuthRouteFeatures><Features /></AuthRouteFeatures>
              
            
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;