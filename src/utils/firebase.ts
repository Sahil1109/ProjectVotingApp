import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();

export default firebase;
