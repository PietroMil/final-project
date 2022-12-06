import ProtectedRoute from "../components/auth/ProtectedPage";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "../config/config";
import { getDatabase, remove, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const Favorites = () => {
  const storage = JSON.parse(localStorage.getItem("favorites")!);

  const navigate = useNavigate();
  const auth = getAuth();

  const app = initializeApp(config.firebaseConfig);
  const db = getDatabase(app);

  const handleRemoveFavorites = (id: number, index: number) => {
    const existingEntries = storage;
    existingEntries.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(existingEntries));

    navigate("/favorites");
    remove(ref(db, `/${auth.currentUser?.uid}/` + id));
  };

  return (
    <ProtectedRoute>
      <>
        <div className="p-4 dark:bg-gray-700 font-bold bg-purple-500 flex items-center justify-between border-b border-gray-400">
          <div className="flex text-white">
            <button
              onClick={() =>
                navigate("/?search=" + localStorage.getItem("query"))
              }
            >
              BACK TO SEARCH
            </button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {storage
            ? storage.map((el: any, index: any) => (
                <div
                  key={el.id}
                  className={
                    "py-3 flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }
                >
                  <Link
                    key={el.id}
                    to={"/" + el.id.toString()}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                      src={el.imgUrl}
                      alt={el.title}
                    />
                  </Link>
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {el.title}
                    </h5>
                  </div>
                  <button
                    className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-red-500 hover:bg-white mt-4 lg:mt-0"
                    onClick={() => handleRemoveFavorites(el.id, index)}
                  >
                    DELETE
                  </button>
                </div>
              ))
            : ""}
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Favorites;
