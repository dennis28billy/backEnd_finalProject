import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDAo6x_sy54Q8ZU74W4E64ynaBZzlCMw38",
  authDomain: "backend-finalproject-d4066.firebaseapp.com",
  projectId: "backend-finalproject-d4066",
  storageBucket: "backend-finalproject-d4066.appspot.com",
  messagingSenderId: "728411065279",
  appId: "1:728411065279:web:5e61bd8d87f7c8a3206f0a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export default firebase;
