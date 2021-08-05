import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState();

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((snapshot) => {
        setUsername(snapshot.data()?.username);
      });
    }
  }, [user]);
  return { user, username };
};
