import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, onSnapshot, addDoc, } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { app, auth, db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";





export default function Search() {
   

  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/search");
      getPost()
    }

    if (!authToken) {
      navigate("/register");
    }

   
  }, []);

  const myDb = collection(db, "prodotti")
  const [title, setTitle] = useState("")
const [post, setPostList] : any = useState([])

  const createPost = async () => {
    await addDoc(myDb, {title: title, author: auth.currentUser?.uid});
    getPost()
  }
  
  const getPost = async () => {
    const data = await getDocs( myDb )
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }





  return <>
  <label>Title</label>
   <input onChange={(e) => {setTitle(e.target.value) } } ></input>
  
  <button onClick={createPost}>cliccami</button>
  
  {post.map((e: any) => <div>{e.id}.....{e.title}</div>)}
  
  </>;
}
