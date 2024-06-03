import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {addDoc,collection,getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBURzmBRWRa8DnkFhGZ2Z-XLOaFC9U53xg",
  authDomain: "netflix-clone-acf7d.firebaseapp.com",
  projectId: "netflix-clone-acf7d",
  storageBucket: "netflix-clone-acf7d.appspot.com",
  messagingSenderId: "984637799559",
  appId: "1:984637799559:web:fc7138c9fd09e68a848c22",
  measurementId: "G-GGZ8KTVCYR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}


const login=async(email,password)=>{
    try{
        signInWithEmailAndPassword(auth,email,password);

    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};