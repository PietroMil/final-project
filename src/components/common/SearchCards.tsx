import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "../../config/config";
import { getDatabase, ref, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

function SearchCards({ id, title, image }: any) {
  const app = initializeApp(config.firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const [isFavorites, setIsfavorites] = useState<boolean>(false);

  const storage = JSON.parse(localStorage.getItem("favorites")!);

  const handleFavorites = (
    id: number,
    name: string,
    img: string | "undefined"
  ) => {
    update(ref(db, `/${auth.currentUser?.uid}/` + id), {
      id: id,
      title: name,
      imgUrl: img,
    });
    setIsfavorites(true);
  };

  const handleRemoveFavorites = (id: number) => {
    remove(ref(db, `/${auth.currentUser?.uid}/` + id));
    setIsfavorites(false);
  };

  useEffect(() => {
    if (storage) {
      storage.forEach((element: any) => {
        if (element.id === id) {
          setIsfavorites(true);
        }
      });
    }
  }, [id, storage]);

  return (
    <>
      <div className="max-w-sm bg-white  rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 py-3">
        <Link key={id} to={id.toString()} style={{ textDecoration: "none" }}>
          <img className="rounded-t-lg" src={image || "/logo192.png"} alt="" />
        </Link>
        {isFavorites ? (
          <button onClick={() => handleRemoveFavorites(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="fill-red-500"
              className={"w-6 h-6 fill-red-500"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => handleFavorites(id, title, image! || "/logo192.png")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="fill-red-500"
              className={"w-6 h-6 fill-gray-500"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        )}
        <div className="p-2">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
      </div>
    </>
  );
}

export default SearchCards;
