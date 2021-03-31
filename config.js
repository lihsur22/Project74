import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBgHMljfHfaWXCBEzb_UshNBj0I1oMBQ_c",
    authDomain: "pro71-613f7.firebaseapp.com",
    databaseURL: "https://pro71-613f7.firebaseio.com",
    projectId: "pro71-613f7",
    storageBucket: "pro71-613f7.appspot.com",
    messagingSenderId: "273090188285",
    appId: "1:273090188285:web:489dc761f0a9c8bf13ff94"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();