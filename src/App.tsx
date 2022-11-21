import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./pages/HomeUser";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/auth/AuthRoute"


initializeApp(config.firebaseConfig)


export interface InputAppProps {}

const App: React.FunctionComponent<InputAppProps> = () => {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
      <AuthRoute><HomeUser /></AuthRoute>
      }
       />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;