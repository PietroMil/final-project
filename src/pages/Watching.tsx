import ProtectedRoute from "../components/auth/ProtectedPage";
import { Link, useNavigate } from "react-router-dom";
import useWatching from "../hooks/useWatching";

const Watching = () => {
  const [watching, , removeWatching, userWatching] = useWatching()

  const navigate = useNavigate();

  const handleRemoveWatching = (id: number) => {
    removeWatching()
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
        <p className="text-2xl p-4">YOUR WATCHING</p>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
          {
            userWatching ?  <div
            className={
              "py-3 flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            }
          >
            <Link
              to={"/" + userWatching.id.toString()}
              style={{ textDecoration: "none" }}
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={userWatching.imgUrl}
                alt={userWatching.title}
              />
            </Link>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {userWatching.title}
              </h5>
            </div>
            <button
                    className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-red-500 hover:bg-white mt-4 lg:mt-0"
                    onClick={() => handleRemoveWatching(userWatching.id)}
                  >
                    DELETE
                  </button>
          </div> : ""
          }
        </div>
        <p className="text-2xl p-4">OTHER USER WATCHING</p>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
          {watching
            ? watching.map((el: any) => (
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
                  
                </div>
              ))
            : ""}
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Watching;



