import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, database, provider } from "./firebase";
import { ref, get } from "firebase/database";

export const googleLogin = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const firebaseLogout = () => {
  signOut(auth).catch(console.error);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}
