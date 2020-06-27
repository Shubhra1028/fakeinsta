import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyASFbjgKestWhxRI-JpSlyju0wjeXCJtEw",
  authDomain: "instadummy-2389.firebaseapp.com",
  databaseURL: "https://instadummy-2389.firebaseio.com",
  projectId: "instadummy-2389",
  storageBucket: "instadummy-2389.appspot.com",
  messagingSenderId: "162601898298"
};
firebase.initializeApp(config);
firebase.firestore().settings({}) //new
// firebase.firestore().settings({timestampsInSnapshots: true})

  export default firebase;