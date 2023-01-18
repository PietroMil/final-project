import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../components/common/Form";

export interface InputLoginProps {}

const RegisterPage: React.FunctionComponent<InputLoginProps> = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  //email and password
  const handleAction = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, { displayName: username });
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("Email Already in Use");
        }
        if (error.code === "auth/weak-password") {
          setError("Weak Password - 6 or more character need ");
        }
      });
  };

  return (
    <div className="m-2">
      <div>
        <div className="w-full max-w-sm mt-6 m-auto">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name-user"
                type="text"
                placeholder="Name"
                autoComplete="on"
              />
            </div>
          </div>
        </div>
        <Form
          title="Register"
          setEmail={setEmail}
          setPassword={setPassword}
          setError={error}
          handleAction={() => handleAction()}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
