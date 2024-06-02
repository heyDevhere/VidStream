import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBc77MlQNQbhU4v-HPVyrV5SE79qD3EsAU",
    authDomain: "video-8c3ca.firebaseapp.com",
    projectId: "video-8c3ca",
    storageBucket: "video-8c3ca.appspot.com",
    messagingSenderId: "1056186657535",
    appId: "1:1056186657535:web:156b933631fd252d99faca"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const provider = new GoogleAuthProvider();

export default app;

