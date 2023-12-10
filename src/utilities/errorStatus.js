import Alert from "../config/Alert";

const errorStatus = (errorCode) => {
  switch (errorCode.code) {
    case "auth/email-already-in-use":
      console.error(errorCode.code);
      Alert.fire({
        icon: "error",
        text: "This email is already exist! please login",
      });
      break;
    case "auth/invalid-credential":
      console.error(errorCode.code);
      Alert.fire({
        icon: "error",
        text: "Email or Password doesn't match",
      });
      break;
    default:
      console.error(errorCode.code);
      Alert.fire({
        icon: "error",
        text: errorCode.code,
      });
      break;
  }
};
export default errorStatus;
