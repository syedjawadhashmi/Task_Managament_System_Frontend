import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBYYIbAaPYbWsSgeKM0Muek-cK8lc9gGv4",
  authDomain: "todo-list-app-dd6f1.firebaseapp.com",
  databaseURL: "https://todo-list-app-dd6f1.firebaseio.com",
  projectId: "todo-list-app-dd6f1",
  storageBucket: "todo-list-app-dd6f1.appspot.com",
  messagingSenderId: "291723151868"
};

const firebaseApp = firebase.initializeApp(config);
//export firebase
export default firebaseApp;
export const database = firebaseApp.firestore();
