import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc,collection,getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCR3-_PV3QPLxo6RJckaVxkoQ9aYR2CMyw",
  authDomain: "netflix-clone-ebc2a.firebaseapp.com",
  projectId: "netflix-clone-ebc2a",
  storageBucket: "netflix-clone-ebc2a.firebasestorage.app",
  messagingSenderId: "450662397937",
  appId: "1:450662397937:web:832d30ff2b5b8a03703650"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password) =>{
    try{
const res= await createUserWithEmailAndPassword(auth,email,password);
const user =res.user;
     await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
     })
    }
    catch(error){
      console.log(error);
      alert(error);
    }

}

const login =async()=>{
 
    try{

      await  signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
       console.log(error);
       alert(error);
    }

    }
    const logout =() =>{
        signOut(auth);
    }

    export {auth,db,login,signup,logout};