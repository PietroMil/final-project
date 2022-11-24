import { useEffect, useState } from "react";



const Features = () => {
  const [isFavorites, setIsfavorites] = useState<boolean>(false);
  const storage = JSON.parse(localStorage.getItem("favorites") || "");
 

  useEffect(() => {
    storage.forEach((element: any) => {
      console.log(element.id)

    }
  
  )}, []);

  return  (
    <>
     PREFERITI
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
    { storage.map((el: any) => (

<div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={el.imgUrl} alt={el.title} />
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{el.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique tenetur, veritatis assumenda consequuntur in neque quia cupiditate doloremque a quas temporibus delectus, cum molestias vero illum, voluptas consequatur placeat labore?</p>
    </div>
</div>

    
    
    ))}
</div>
      </>
)};

export default Features;