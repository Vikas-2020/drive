import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../slices/authSlice";

function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Extract only serializable fields
        const { uid, email, displayName, photoURL } = firebaseUser;
        dispatch(setUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

export default AuthListener;
