import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Register (Email & Password)

  const registerUser = (name, photo, email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        // Update Display Name & Photo
        await updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });

        return result.user;
      }
    );
  };

  // Login (Email & Password)

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-in (Required)

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  Logout

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Auth Observer

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // Context Values

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
