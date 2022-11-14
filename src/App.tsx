import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./components/common/Form";
import { useState } from "react";
import { app } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleAction = (id: number) => {
    const authentication = getAuth(app);
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response: any) => {
          navigate("/home");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          sessionStorage.setItem("email", response.user.email);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            setError("Email Already in Use");
          }
          if (error.code === "auth/weak-password") {
            setError("Weak Password - 6 or more character need ");
          }
        });
    }

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response: any) => {
          navigate("/home");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          sessionStorage.setItem("email", response.user.email);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/wrong-password") {
            setError("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            setError("Please check the email");
          }
          if (error.code === "auth/invalid-email") {
            setError("Invalid Email");
          }
        });
    }
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Form
              title="Login"
              setEmail={setEmail}
              setPassword={setPassword}
              setError={error}
              handleAction={() => handleAction(1)}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Form
              title="Register"
              setEmail={setEmail}
              setPassword={setPassword}
              setError={error}
              handleAction={() => handleAction(2)}
            />
          }
        />

        <Route path="/home" element={<Home />} />
      </Routes>
      
    </>
    
  );
}

export default App;
