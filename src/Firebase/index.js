import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});

const storage = firebase.storage();
const db = firebase.firestore().collection("submissions");
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { db, timestamp, storage as default };
