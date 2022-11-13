import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./firebase-config";

export default function Home() {
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/");
  };
  let navigate = useNavigate();
  useEffect(() => {
    console.log(sessionStorage);
    const authentication = getAuth(app);
    console.log(authentication);
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }

    if (!authToken) {
      navigate("/register");
    }
  }, []);

  let name = sessionStorage.getItem("email");

  return (
    <div>
        <p>CIAO</p>
      <h1>{name}</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
