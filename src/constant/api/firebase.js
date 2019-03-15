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

 // Initialize Firebase
//  var config = {
//   apiKey: "AIzaSyDj9i8jnZBL6igPuonwcSdKoQTdb0e6MnI",
//   authDomain: "labtask-2.firebaseapp.com",
//   databaseURL: "https://labtask-2.firebaseio.com",
//   projectId: "labtask-2",
//   storageBucket: "labtask-2.appspot.com",
//   messagingSenderId: "996188613125"
// };
const firebaseApp = firebase.initializeApp(config);
//export firebase
export default firebaseApp;
export const database = firebaseApp.firestore();
