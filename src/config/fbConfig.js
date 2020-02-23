import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config =  {
    apiKey: "AIzaSyCOsBhiS-gUvJ--rtKeY6eljedeixSS5FI",
    authDomain: "hcon-98e1e.firebaseapp.com",
    databaseURL: "https://hcon-98e1e.firebaseio.com",
    projectId: "hcon-98e1e",
    storageBucket: "hcon-98e1e.appspot.com",
    messagingSenderId: "413063046385",
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;