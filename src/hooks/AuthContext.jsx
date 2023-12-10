import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoader(false);
        setUserData(currentUser);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = { userData, register, loader };
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
