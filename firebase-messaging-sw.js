 importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js');

  // นำค่า Config ที่ Copy ไว้ในตอนแรก มาแทนค่าทีนี่
 firebase.initializeApp({
	  apiKey: "<< apiKey >>",
    authDomain: "<< authDomain >>",
    projectId: "<< projectId >>",
    storageBucket: "<< storageBucket >>",
    messagingSenderId: "<< messagingSenderId >>",
    appId: "<< appId >>"
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        //icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
