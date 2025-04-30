import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  signOut,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "true-chat-ai.firebaseapp.com",
  projectId: "true-chat-ai",
  storageBucket: "true-chat-ai.firebasestorage.app",
  messagingSenderId: "64291492980",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  if (e.code === "auth/already-initialized") {
    auth = getAuth(app); // If already initialized, use the existing auth instance
  } else {
    throw e; // Rethrow other errors
  }
}

const db = getFirestore(app);

export { auth, db };

// const logoutAndClearStorage = async () => {
//   try {
//     await signOut(auth); // Выход из аккаунта
//     await AsyncStorage.clear(); // Очистка всего стораджа
//     console.log("Вышел из аккаунта и очистил сторадж");
//   } catch (e) {
//     console.error("Ошибка при выходе и очистке", e);
//   }
// };

// logoutAndClearStorage();
