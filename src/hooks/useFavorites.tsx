import { useContext, useEffect, useState } from "react";
import { ShowFavorites } from "../components/API";
import { UserContext } from "../context/UserContext";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { app } from "../config/config";

const useFavorites = (): [
  favorite: ShowFavorites[],
  addFavorite: (id: number, name: string, img: string) => void,
  removeFavorite: (id: number) => void
] => {
  const [favorite, setFavorite] = useState<ShowFavorites[]>([]);

  const { user }: any = useContext(UserContext);
  const db = getDatabase(app);

  useEffect(() => {
    const favoritesCount = ref(db, "/" + user.uid + "/");

    onValue(favoritesCount, (snapshot) => {
      const data = snapshot.val();

      const favoriteArray: ShowFavorites[] = [];
      for (const iterator in data) {
        favoriteArray.push(data[iterator]);
      }

      setFavorite(favoriteArray);
    });
  }, [user]);

  const addFavorite = (id: number, name: string, img: string) => {
    update(ref(db, `/${user.uid}/` + id), {
      id: id,
      title: name,
      imgUrl: img,
    });
  };
  const removeFavorite = (id: number) => {
    remove(ref(db, `/${user.uid}/` + id));
  };
  //custom hook export
  return [favorite, addFavorite, removeFavorite];
};

export default useFavorites;
