import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDXEZdAKOpQFnHoH0Gaw60z0S0_ePzWoJo",
  authDomain: "barter-system-b3cc8.firebaseapp.com",
  projectId: "barter-system-b3cc8",
  storageBucket: "barter-system-b3cc8.appspot.com",
  messagingSenderId: "825262349935",
  appId: "1:825262349935:web:3dd678f266a4f8d50cf79a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();