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
     
      image={data?.image} /
            
              {data?.title}
            
              {data?.summary}
           
           {data?.avgRating} 
          
            <button onClick={() => navigate(-1)}>HOME</button>
          
    
    </>
  ) : (
   <p>..loading</p>
  );
};

export default DetailPage;