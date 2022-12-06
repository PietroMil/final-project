import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShowById, ShowDetailType } from "../components/API";

const DetailPage = () => {
  const { showId } = useParams();
  const [data, setData] = useState<ShowDetailType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    //!! serve per dire esiste..doppia negazione
    if (!!showId) {
      try {
        const showIdNum = parseInt(showId);
        getShowById(showIdNum).then((res) => {
          setData(res);
        });
      } catch (err) {
        console.error("NaN");
      }
    }
  }, [showId]);

  return !!data ? (
    <>
      <div className=" md:h-screen grid content-center justify-center  ">
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={data?.image}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {data?.summary}
            </p>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Rating star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {data?.avgRating ? data?.avgRating : "no rating"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="grid justify-items-center ">
      <h2>No detail</h2>
    </div>
  );
};

export default DetailPage;
