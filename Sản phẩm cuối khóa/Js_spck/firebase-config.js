// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCV9rztZ77zQALbkbENsnSPQ-NcvYzJQho",
  authDomain: "spck-moviex.firebaseapp.com",
  projectId: "spck-moviex",
  storageBucket: "spck-moviex.firebasestorage.app",
  messagingSenderId: "544644738410",
  appId: "1:544644738410:web:948599a64b8742f1f94913",
  measurementId: "G-W637ZXEL8E"
};

// KHỞI TẠO FIREBASE
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

console.log("✅ Firebase đã kết nối thành công!");
console.log("Project ID:", firebaseConfig.projectId);