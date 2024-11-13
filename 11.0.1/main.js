// นำเข้า Firebase SDK และโมดูลที่ต้องการใช้งาน
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js";

// กำหนดค่าการเชื่อมต่อ Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ลงทะเบียน Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.error("Service Worker registration failed:", error);
            });
    });
}

// ฟังก์ชันขอสิทธิ์ในการแจ้งเตือนและดึง token
async function requestNotificationPermission() {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("Notification permission granted.");
            const token = await getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" });
            console.log("FCM Token:", token);
            // ส่ง token ไปยัง backend เพื่อเก็บไว้ใช้ในภายหลัง
        } else {
            console.error("Notification permission denied.");
        }
    } catch (error) {
        console.error("Unable to get permission to notify.", error);
    }
}

// เรียกใช้ฟังก์ชันเพื่อขอสิทธิ์แจ้งเตือนจากผู้ใช้
requestNotificationPermission();

// Listener สำหรับข้อความที่ได้รับขณะเปิดใช้งานเว็บ
onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    // แสดงการแจ้งเตือนหรือจัดการข้อความที่ได้รับได้ที่นี่
});
