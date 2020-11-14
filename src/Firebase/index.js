import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyDLfKOXwWZVU-EHiVuNivMjbzZHA66VGpA",
  authDomain: "image-uploader-a4258.firebaseapp.com",
  databaseURL: "https://image-uploader-a4258.firebaseio.com",
  projectId: "image-uploader-a4258",
  storageBucket: "image-uploader-a4258.appspot.com",
  messagingSenderId: "390530709910",
  appId: "1:390530709910:web:df35caf724bb748c9ac5b7",
});

const storage = firebase.storage();
const db = firebase.firestore().collection("submissions");
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { db, timestamp, storage as default };
