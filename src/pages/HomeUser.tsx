import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import React from "react";
import "../Header.css";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { config } from "../config/config";
import Search from "../components/common/Search";
export interface InputHomePageProps {}

const HomeUser: React.FunctionComponent<InputHomePageProps> = () => {
    
  const auth = getAuth();
  const name = sessionStorage.getItem("name") || auth.currentUser?.displayName

  const app = initializeApp(config.firebaseConfig)
  const db = getDatabase(app);
  const favoritesCount = ref(db, `${auth.currentUser?.uid}` + '/')

  const [isNavOpen, setIsNavOpen] = useState(false);
  
 

useEffect(()=> {
onValue(favoritesCount, (snapshot) => {
const data = snapshot.val()
let newObj = {...data}
console.log(newObj)

})}, [])

    


  return (
    <>
    
      <div className="font-bold bg-purple-500 flex items-center justify-between border-b border-gray-400 p-4">
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
                isNavOpen ? "showMenuNav bg-purple-500" : "hideMenuNav"
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

              <ul className="text-white flex flex-col items-center justify-center min-h-[250px]">
                <li className="mt-6">
                  <div className="flex text-white">
                    {" "}
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
                <li className=" my-2 uppercase">
                  <a href="/about">About</a>
                </li>
                <li className=" my-2 uppercase">
                  <a href="/portfolio">Portfolio</a>
                </li>
                <li className=" my-2 uppercase">
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <span className="font-semibold text-xl tracking-tight">
                    {name}
                  </span>
                </li>
                <li>
                  <a
                    onClick={() => {
                        signOut(auth);
                        sessionStorage.removeItem("name");
                        sessionStorage.removeItem("Auth Token");
                        sessionStorage.removeItem("email");
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
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/portfolio">Portfolio</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <span className="font-semibold">{name}</span>
            </li>
            <li>
              <a
               onClick={() => {
                signOut(auth);
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

    </>
  );
};

export default HomeUser;
