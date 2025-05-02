// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getDatabase, ref, get, child, set} from 'firebase/database'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


  const firebaseConfig = {
    apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: "wedings-one",
    storageBucket: "wedings-one.firebasestorage.app",
    messagingSenderId: "49992893490",
    appId: "1:49992893490:web:4077263dec14a3dead682b",
    measurementId: "G-D3NM4LXBKD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app)

const fetchWeddingData = async (id) => {
    const dbRef = ref(database);
    try {
        const data = await get(child(dbRef, `/weddings-NI-2/${id}`))
        if (data.exists()) {
            return data.val()
        } else {
            console.log('eror' );
            return null
        }
    } catch (error) {
        console.log('tidak bekerja', error);
        return null
    }
}
const addDataToFirebase = async (id, formData) => {

    try {
      await set(ref(database, `/weddings-NI-2/${id}`), formData);
      console.log("Data successfully added!");
    } catch (error) {
      console.error("Error adding data:", error);
    }
    
  };
 const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
    // setVerify(true)
    return true

  } catch (error) {
    console.error("Error during login:", error.message);
   
  }}

export {app, database, fetchWeddingData, addDataToFirebase, login}