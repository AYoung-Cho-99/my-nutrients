import { initializeApp, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

function initializeAppIfNecessary() {
  try {
    return getApp()
  } catch {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DB_URL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    };
    return initializeApp(firebaseConfig)
  }
}

const app = initializeAppIfNecessary();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback : any) { // 사용자의 상태가 바뀔때마다 콜백함수 호출
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
