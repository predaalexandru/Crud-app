import * as firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDxSTrEd6SU2vH1LB9UWIdZm-FdYNAQk9c",
  authDomain: "company-86613.firebaseapp.com",
  databaseURL: "https://company-86613.firebaseio.com",
  projectId: "company-86613",
  storageBucket: "company-86613.appspot.com",
  messagingSenderId: "645825261448"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;