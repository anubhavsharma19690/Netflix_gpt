import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCb_l0a-5U9-esQEIM4ifuJ34cMmzU0qVI",
    authDomain: "netflixgpt-8421.firebaseapp.com",
    projectId: "netflixgpt-8421",
    storageBucket: "netflixgpt-8421.firebasestorage.com",
    messagingSenderId: "874521836767",
    appId: "1:874521836767:web:9d9d732117043705333d6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export auth using the initialized app
export const auth = getAuth()