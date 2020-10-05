import firebase from 'firebase';
const firebaseApp=firebase.initializeApp(
{
    apiKey: "AIzaSyD29_ceoDxZkL8Aw8xkPe0aqPtTf_cJbn4",
    authDomain: "facebook-messenger-clone-17424.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-17424.firebaseio.com",
    projectId: "facebook-messenger-clone-17424",
    storageBucket: "facebook-messenger-clone-17424.appspot.com",
    messagingSenderId: "309065908943",
    appId: "1:309065908943:web:d97af8a32d164f8a7b2dba",
    measurementId: "G-2D7DKR653G"
});

const db=firebaseApp.firestore();

export default db;