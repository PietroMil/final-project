import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../Header.css";
import Search from "../components/common/Search";
import { app } from "../config/config";
import ProtectedRoute from "../components/auth/ProtectedPage";
import ThemeButton from "../theme/ThemeButton";

export interface InputHomePageProps {}

const HomeUser: React.FunctionComponent<InputHomePageProps> = () => {
    
  const auth = getAuth(app);
  const name: any = localStorage.getItem('user')

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate()
  

  return (
    <ProtectedRoute user={JSON.parse(localStorage.getItem('user') || '{"uid": false}' )} >  
    
    <div className="dark:bg-gray-700 font-bold bg-purple-500 flex items-center justify-between border-b border-gray-400 p-4">
      <div className="flex text-white">
      
        <svg
          className="fill-white h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
        </svg>
        <span className="font-semibold text-xl tracking-tight">Films</span>
        <ThemeButton></ThemeButton>
      </div>

      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="cursor-pointer HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div
            className={
              isNavOpen ? "dark:bg-gray-700 showMenuNav bg-purple-500" : "hideMenuNav"
            }
          >
            <div
              className="cursor-pointer absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <ul className=" flex flex-col items-center justify-center min-h-[250px]">
              <li className="mt-6">
                <div className="flex text-white">
                  
                  <svg
                    className="fill-white h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
                  </svg>
                  <span className="font-semibold text-xl tracking-tight">
                    Films
                  </span>
                </div>
              </li>
              <li className="text-green-500">
            <span className="text-2xl font-semibold">{JSON.parse(name).displayName}</span>
          </li>
              <li className="text-white text-xl my-2 uppercase">
              <button onClick={() => navigate('/favorites')}>Favorites</button>
              </li>
              <li>
                <a
                  onClick={() => {
                      signOut(auth);
                      navigate('/login')

                      sessionStorage.removeItem("name");
                      sessionStorage.removeItem("Auth Token");
                      sessionStorage.removeItem("email");
                      localStorage.removeItem("favorites");
                    }}
                  className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  LogOut
                </a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="text-white DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
          <button onClick={() => navigate('/favorites')}>Favorites</button>
          </li>
          <li>
            <a
             onClick={() => {
              signOut(auth);
              navigate('/login')
              sessionStorage.removeItem("name");
              sessionStorage.removeItem("Auth Token");
              sessionStorage.removeItem("email");
            }}
              className=" cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              LogOut
            </a>
          </li>
        </ul>
      </nav>
    </div>
<Search />


  </ProtectedRoute>
  
  );
};

export default HomeUser;
