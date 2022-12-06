import { getShowsBySearch, ShowType } from "../API/index";
import { useCallback, useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "../../config/config";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import SearchCards from "./SearchCards";
import { UserContext } from "../../context/UserContext";

function Search() {
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);
  const { user }: any = useContext(UserContext);

  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
      localStorage.setItem("query", query);
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

  const takeFavorites = () => {
    const auth = getAuth();
    const app = initializeApp(config.firebaseConfig);
    const uid = auth.currentUser?.uid;

    const db = getDatabase(app);
    const favoritesCount = ref(db, "/" + uid + "/");

    onValue(favoritesCount, (snapshot: any) => {
      const data = snapshot.val();

      const favorites: any = [];
      for (const iterator in data) {
        favorites.push(data[iterator]);
      }
      const favoriteStorage = JSON.stringify(favorites);
      localStorage.setItem("favorites", favoriteStorage);
    });
  };

  useEffect(() => {
    takeFavorites();
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
      <div className="py-3 dark:text-white">
        <div className="py-3">
          <p className="text-lg text-center">
            Hello,
            <i className="text-xl font-bold underline decoration-indigo-500">
              {user.displayName}
            </i>
          </p>
          <p className="text-base text-center">
            search for a movie, see detail and add to your favorites
          </p>
        </div>
        <label
          htmlFor="first_name"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="grid px-4">
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
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 px-4">
        {shows.map((el) => (
          <SearchCards
            key={el.id}
            id={el.id}
            title={el.title}
            image={el.image}
          ></SearchCards>
        ))}
      </div>
    </>
  );
}

export default Search;
