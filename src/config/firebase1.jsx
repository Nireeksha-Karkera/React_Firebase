import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth" 
import {getAuth,GoogleAuthProvider} from "firebase/auth" 
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDypWfwNNfk1_vdv1a84CDtDbbFrIFHDC0",
  authDomain: "fir-f2e31.firebaseapp.com",
  projectId: "fir-f2e31",
  storageBucket: "fir-f2e31.appspot.com",
  messagingSenderId: "624700980126",
  appId: "1:624700980126:web:579678fa60ff2f3038748f",
  measurementId: "G-X67WMNLV9N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider =new GoogleAuthProvider()
export const db=getFirestore(app)
export const storage =getStorage(app)