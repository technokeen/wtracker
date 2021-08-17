import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-XAtDab6-OYquiJ1fB_pAqEfYji0ibcs",
    authDomain: "fir-hosting-ninja-d89e8.firebaseapp.com",
    databaseURL: "https://fir-hosting-ninja-d89e8.firebaseio.com",
    projectId: "fir-hosting-ninja-d89e8",
    storageBucket: "fir-hosting-ninja-d89e8.appspot.com",
    messagingSenderId: "880942837560",
    appId: "1:880942837560:web:b696d17fd443bfd3821bcd"
  };
  // Initialize Firebase
  var fireDB= firebase.initializeApp(firebaseConfig);

  export default fireDB;