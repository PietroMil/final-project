import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFavorites from "../../hooks/useFavorites";
import useWatching from "../../hooks/useWatching";

function SearchCards({ id, title, image }: any) {

  const [isFavorites, setIsfavorites] = useState<boolean>(false);
  const [isWatching, setIswatching] = useState<boolean>(false);

  const [storage, addFavorite, removeFavorite] = useFavorites()
  const [watching, addWatching, removeWatching, userWatching] = useWatching()

  //favorites
  const handleFavorites = (
    id: number,
    name: string,
    img: string | "undefined"
  ) => {
  addFavorite(id, name, img)
    setIsfavorites(true);
  };

  const handleRemoveFavorites = (id: number) => {
    removeFavorite(id)
    setIsfavorites(false);
  };

  //watching
  const handleWatching = (
    id: number,
    name: string,
    img: string | "undefined"
  ) => {
  addWatching(id, name, img)
    setIswatching(true);
  };

  const handleRemoveWatching = () => {
    removeWatching();
    setIswatching(false)
  }

  useEffect(() => {
    if (storage) {
      storage.forEach((element: any) => {
        if (element.id === id) {
          setIsfavorites(true);
        }
      });
    }

  }, [id, storage]);

  useEffect(() => {
    if (userWatching) {
      if(userWatching.id === id){
        setIswatching(true)
      }else{
        setIswatching(false)
      }
    }
  }, [userWatching]);



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
        {isWatching ? (
          <button onClick={handleRemoveWatching}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="800px"
              height="800px"
              viewBox="0 0 442.04 442.04"
              className={"w-6 h-6 fill-red-500"}
            >
              <g>
                <g>
                  <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203    c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219    c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367    c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021    c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212    c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071    c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z" />
                </g>
                <g>
                  <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188    c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993    c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5    s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z" />
                </g>
                <g>
                  <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" />
                </g>
              </g>
            </svg>
          </button>
        ) : (
          <button
            onClick={() => handleWatching(id, title, image! || "/logo192.png")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="800px"
              height="800px"
              viewBox="0 0 442.04 442.04"
              className={"w-6 h-6 fill-gray-500"}
            >
              <g>
                <g>
                  <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203    c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219    c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367    c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021    c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212    c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071    c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z" />
                </g>
                <g>
                  <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188    c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993    c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5    s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z" />
                </g>
                <g>
                  <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" />
                </g>
              </g>
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
