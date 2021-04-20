import * as firebase from 'firebase/app';

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyChtj-YffRIj0huc6ee9WFaZ7C3lskcwO8",
    authDomain: "sparta-myhoneytip-2fb7b.firebaseapp.com",
    databaseURL: "https://sparta-myhoneytip-2fb7b.firebaseio.com",
    projectId: "sparta-myhoneytip-2fb7b",
    storageBucket: "sparta-myhoneytip-2fb7b.appspot.com",
    messagingSenderId: "863063971905",
    appId: "1:863063971905:web:49ed8e705525c47a194ec0",
    measurementId: "G-0VF5V40PQE"
};

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()