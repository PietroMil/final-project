import { getShowsBySearch, ShowType } from "../API/index";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "../../config/config";
import { getDatabase, onChildAdded, ref, set, update, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

function Search() {
  
  const auth = getAuth();

  const handleFavorites = (idN: number) => {
    const app = initializeApp(config.firebaseConfig)
    const db = getDatabase(app);
    const newChild = set(ref(db, '/' + `${auth.currentUser?.uid}`), idN )
    
    
    
  }

  

  

  
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
    },
    [setCurrentSearch]
  );

  const isSearchButtonDisabled = () =>
    currentSearch.get("search")?.trim().length === 0;

  const handleOnSearch = useCallback(() => {
    getShowsBySearch(currentSearch?.get("search") || "").then((res) =>
      setShows(res)
    );
  }, [currentSearch]);



  useEffect(() => {
    const currentSearchStr = currentSearch?.get("search")?.trim();
    if (
      !!currentSearchStr &&
      currentSearchStr.length > 0 &&
      shows.length === 0
    ) {
      handleOnSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
    
  
    return (
      <>
        <div className="py-3">
            <div className="py-3"><p className="text-lg text-center">Hello, <i className="text-xl font-bold underline decoration-indigo-500">{sessionStorage.getItem("name") || sessionStorage.getItem("email")}</i> </p>
            <p className="text-base text-center">search for a movie, see detail and add to your favorites</p></div>
          <label
            htmlFor="first_name"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="first_name"
              onChange={(e) => handleOnSearchChange(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              disabled={isSearchButtonDisabled()}
              onClick={handleOnSearch}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
        {shows.map((el) => (
            
         
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={el.image} alt="" />
        <p>{el.id}</p>
    </a>
    <div className="p-2">
        
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{el.title}</h5>
       <p>Detail  </p>
 <button onClick={()=> handleFavorites(el.id)}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="fill-red-500" className={  el.id ? "w-6 h-6 fill-gray-500" : "w-6 h-6 fill-red-500"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          </button>
    
    </div>
</div>
          
        ))}
      
      </div>
      
      </>
    );
  }
  
  export default Search;
  


