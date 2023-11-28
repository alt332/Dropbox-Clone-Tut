import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiSrEu0eFMJJFznfhwiwDosaKKHlpMzWc",
  authDomain: "dropbox-clone-f9f8e.firebaseapp.com",
  projectId: "dropbox-clone-f9f8e",
  storageBucket: "dropbox-clone-f9f8e.appspot.com",
  messagingSenderId: "233996580851",
  appId: "1:233996580851:web:b143d37837d8952ddb8486",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
