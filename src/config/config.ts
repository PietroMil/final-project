import { initializeApp } from "firebase/app";
export const config = {

    firebaseConfig: {
        apiKey: "AIzaSyA4JGoVpXJOzK0hynV2spYUHuHoJC6cATs",
        authDomain: "tv-maze-app-pietro-milanese.firebaseapp.com",
        databaseURL:
          "https://tv-maze-app-pietro-milanese-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "tv-maze-app-pietro-milanese",
        storageBucket: "tv-maze-app-pietro-milanese.appspot.com",
        messagingSenderId: "622772533009",
        appId: "1:622772533009:web:7f3c0789d901f672d4beb0",
        measurementId: "G-2QBMKJTD4T",
      }
}

export const app = initializeApp(config.firebaseConfig);