import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContextData = createContext(null);

const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);

  const register = (email, pass) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email, pass) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUserData(currentUser);
      // if (currentUser) {
      //   if (!currentUser?.emailVerified) {
      //     const { isConfirmed } = await Alert.fire({
      //       icon: "warning",
      //       title: "Email not verified!",
      //       text: "Verify your email address.",
      //       showCancelButton: true,
      //       confirmButtonText: "Send email",
      //       cancelButtonText: "Cancel",
      //       reverseButtons: true,
      //     });
      //     if (isConfirmed) {
      //       sendEmailVerification(currentUser);
      //     }
      //   }
      // }
      setLoader(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = { userData, register, login, logout, resetPassword, loader };
  return (
    <AuthContextData.Provider value={authInfo}>
      {children}
    </AuthContextData.Provider>
  );
};
AuthContext.propTypes = {
  children: PropTypes.node,
};
export default AuthContext;
