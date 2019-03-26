import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvRUOXGGNHVkPDQCdxZjleBtd5fEsWmiI",
    authDomain: "task-management-3134d.firebaseapp.com",
    databaseURL: "https://task-management-3134d.firebaseio.com",
    projectId: "task-management-3134d",
    storageBucket: "task-management-3134d.appspot.com",
    messagingSenderId: "62087885009"
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
