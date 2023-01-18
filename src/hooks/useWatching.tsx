import { useContext, useEffect, useState } from "react";
import { ShowFavorites } from "../components/API";
import { UserContext } from "../context/UserContext";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { app } from "../config/config";

const useWatching = (): [
  watching: ShowFavorites[],
  addWatching: (id: number, name: string, img: string) => void,
  removeWatching: () => void,
  userWatching: ShowFavorites | undefined
] => {
  const [watching, setWatching] = useState<ShowFavorites[]>([]);
  const [userWatching, setUserWatching] = useState<ShowFavorites | undefined>();

  const { user }: any = useContext(UserContext);
  const db = getDatabase(app);

  useEffect(() => {
    const watchingRef = ref(db, "/" + "watching" + "/");

    onValue(watchingRef, (snapshot) => {
      const data = snapshot.val();

      const watchingArray: ShowFavorites[] = [];
      for (const iterator in data) {
        watchingArray.push(data[iterator]);
      }

      setWatching(watchingArray);
    });
  }, []);

  useEffect(() => {
    const watchingRef = ref(db, "/" + "watching" + "/" + user.uid);

    onValue(watchingRef, (snapshot) => {
      const data = snapshot.val();
      setUserWatching(data);
    });
  }, [user]);

  const addWatching = (id: number, name: string, img: string) => {
    update(ref(db, `/watching/${user.uid}/`), {
      id: id,
      title: name,
      imgUrl: img,
    });
  };
  const removeWatching = () => {
    remove(ref(db, `/watching/${user.uid}/`));
  };
  //custom hook export
  return [watching, addWatching, removeWatching, userWatching];
};

export default useWatching;
