import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmirMNNJEbHaVOogawPfNqxi5DUx9baRY",
  authDomain: "cz-order-status.firebaseapp.com",
  projectId: "cz-order-status",
  storageBucket: "cz-order-status.appspot.com",
  messagingSenderId: "1076787316407",
  appId: "1:1076787316407:web:04f655eb29b89d9ef8ef32",
  measurementId: "G-6Y412FHTKZ"
};

const app = firebase.initializeApp(firebaseConfig);
const db_order_status = app.firestore();

export default db_order_status;