import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBWiEJqY3QRrzUYdio-lPU8t4G3Uryq43I",
    authDomain: "payzus-c1ad4.firebaseapp.com",
    databaseURL: "https://payzus-c1ad4.firebaseio.com",
    projectId: "payzus-c1ad4",
    storageBucket: "payzus-c1ad4.appspot.com",
    messagingSenderId: "352551127736",
    appId: "1:352551127736:web:39193f99420cd9787e424d",
    measurementId: "G-9KTNZJNTM6"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;