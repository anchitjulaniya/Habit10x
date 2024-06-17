
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAWGrDAtEskRQ5jipv0838xDFp9uQBrqzA",
    authDomain: "habit-yoga.firebaseapp.com",
    projectId: "habit-yoga",
    storageBucket: "habit-yoga.appspot.com",
    messagingSenderId: "204021561999",
    appId: "1:204021561999:web:e3351d7ff20be7fa100efa",
    measurementId: "G-ZPRE0XSZRV"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const Sendrequest = () => {
    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: "BEPKFOmxfpF-5bZrl5tpY499fP38cccCW8-KUuhzCwxdgrxlTUMujBp3YrvoRTHHcGnXThXedxE1HZ5k0_xgUPU" })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('Client Token: ', currentToken);
                    } else {
                        console.log('Failed to generate the registration token.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred when requesting to receive the token.', err);
                }); 
        } else {
            console.log("User Permission Denied.");
        }
    });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
