import Button from "./Button";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import React from "react";
import { InputLoginProps } from "../../pages/LoginPage";

export interface InputFormProps {
  title: string,
  setPassword: Function,
  setEmail: Function,
  setError: string,
  handleAction: Function
}

function Form({ title, setPassword, setEmail, setError, handleAction }: InputFormProps) {
  const location = useLocation();

  
  

  return (
    <>
      <form className="w-full max-w-sm mt-6 m-auto">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Email"
              autoComplete="on"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"
              autoComplete="on"
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <Button title={title} handleAction={handleAction} />
            {location.pathname === "/login" ? (
              <Link
                className="ml-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/register"
              >
                Register
              </Link>
            ) : (
              <Link
                className="ml-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </form>
      <div
        className="w-full max-w-sm mt-6 m-auto p-4 mb-4 text-sm text-red-700 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert"
      >
        {setError}
      </div>

 
    </>
  );
}

export default Form;
