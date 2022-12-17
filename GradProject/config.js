import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
    apiKey: "AIzaSyDwVQ_iYQOWJcr_b4WUdLu1WpaeSg15uNg",
    authDomain: "qaeati-52066.firebaseapp.com",
    databaseURL: "https://qaeati-52066-default-rtdb.firebaseio.com",
    projectId: "qaeati-52066",
    storageBucket: "qaeati-52066.appspot.com",
    messagingSenderId: "287549497279",
    appId: "1:287549497279:web:6fc783613ca92fcdb34b0a",
    measurementId: "G-R3R4FHX8ST"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
  
export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);