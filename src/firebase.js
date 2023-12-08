import firebaseConfig from "./config/firebase.config";
import { getAuth } from "firebase/auth";

const app = getAuth(firebaseConfig);

export { app };
