import { useState } from "react";
import { Spinner } from "keep-react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "../../schemas/auth";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Alert from "../../config/Alert";

const Register = () => {
  const { register } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [showProfileImg, setShowProfileImg] = useState(null);

  const handleProfileImg = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowProfileImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setProfileImg(e.target.files[0]);
    }
  };

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setShowProfileImg(null);
      setProfileImg(null);
    };
  };

  const submitData = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    if (profileImg !== null && showProfileImg !== null) {
      const imgRef = ref(
        storage,
        `users/profileImages/${e.email}_profile_image.png`,
      );

      const uploadTask = uploadBytesResumable(imgRef, profileImg, {
        contentType: "image/png",
      });

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        async () => {
          try {
            const profileLink = await getDownloadURL(uploadTask.snapshot.ref);
            const userData = {
              profileLink,
              fullName: e.fullName,
              email: e.email,
              pass: e.password,
            };
            userRegister(register, userData, reset);
          } catch (err) {
            console.error(err);
            Alert.fire({
              icon: "error",
              text: err,
            });
            reset();
          }
        },
      );
    } else {
      const userData = {
        fullName: e.fullName,
        email: e.email,
        pass: e.password,
      };
      userRegister(register, userData, reset);
    }
  };

  return (
    <div className="con-bg border-color mx-auto rounded-md border p-4 shadow md:w-1/2">
      <h3 className="text-center text-2xl font-bold md:text-4xl">
        Register an account
      </h3>
      <div className="mx-auto my-4 w-fit text-center">
        <label>
          <input
            type="file"
            name="profileImage"
            onChange={handleProfileImg}
            accept="image/*"
            hidden
          />
          <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-gray-500 text-gray-500">
            {showProfileImg ? (
              <img
                className="h-full w-full object-cover object-center"
                src={showProfileImg}
                alt="user profile image"
              />
            ) : (
              <FaUserAstronaut size={60} />
            )}
          </div>
          <div>
            <span className="btn btn-pri-outline btn-sm m-1">
              Upload profile image
            </span>
            {showProfileImg && (
              <button
                onClick={() => {
                  setProfileImg(null);
                  setShowProfileImg(null);
                }}
                className="btn btn-pri btn-sm m-1"
              >
                Remove profile image
              </button>
            )}
          </div>
        </label>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={submitData}
      >
        <Form className="mt-4 space-y-2">
          <Field name="fullName">
            {({ field, meta: { touched, error } }) => (
              <div>
                <input
                  type="text"
                  className={
                    "input " + (error && touched ? "input-error " : "")
                  }
                  placeholder="Full Name"
                  {...field}
                />
                {error && touched && (
                  <p className="mt-1 text-body-6 text-red-500">{error}</p>
                )}
              </div>
            )}
          </Field>
          <Field name="email">
            {({ field, meta: { touched, error } }) => (
              <div>
                <input
                  type="email"
                  className={
                    "input " + (error && touched ? "input-error " : "")
                  }
                  placeholder="Email address"
                  {...field}
                />
                {error && touched && (
                  <p className="mt-1 text-body-6 text-red-500">{error}</p>
                )}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ field, meta: { touched, error } }) => (
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className={
                    "input " + (error && touched ? "input-error " : "")
                  }
                  placeholder="Password"
                  {...field}
                />

                <button
                  onClick={() => setShowPass((l) => !l)}
                  className="absolute right-2 top-0 z-30 p-2 text-gray-500"
                  type="button"
                >
                  {showPass ? (
                    <IoIosEye size={25} />
                  ) : (
                    <IoIosEyeOff size={25} />
                  )}
                </button>
                {error && touched && (
                  <p className="mt-1 text-body-6 text-red-500">{error}</p>
                )}
              </div>
            )}
          </Field>
          <Field name="confirmPassword">
            {({ field, meta: { touched, error } }) => (
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className={
                    "input " + (error && touched ? "input-error " : "")
                  }
                  placeholder="Confirm password"
                  {...field}
                />
                <button
                  onClick={() => setShowPass((l) => !l)}
                  className="absolute right-2 top-0 z-30 p-2 text-gray-500"
                  type="button"
                >
                  {showPass ? (
                    <IoIosEye size={25} />
                  ) : (
                    <IoIosEyeOff size={25} />
                  )}
                </button>
                {error && touched && (
                  <p className="mt-1 text-body-6 text-red-500">{error}</p>
                )}
              </div>
            )}
          </Field>
          <Field name="acceptTerms">
            {({ field, meta: { touched, error } }) => (
              <div>
                <label className="inline-flex cursor-pointer gap-2">
                  <input className="leading-tight" type="checkbox" {...field} />
                  <p className="text-sm">
                    Terms and conditions
                    <Link to="/terms_and_conditions" className="link ml-1">
                      read
                    </Link>
                  </p>
                </label>
                {error && touched && (
                  <p className="mt-1 text-body-6 text-red-500">{error}</p>
                )}
              </div>
            )}
          </Field>
          <button
            disabled={spinner}
            className="btn btn-pri w-full"
            type="submit"
          >
            {spinner ? <Spinner color="info" size="sm" /> : "Register"}
          </button>
        </Form>
      </Formik>
      <p className="mt-2 text-center text-body-5 text-gray-400">
        Do you have an account?
        <Link className="link ml-1" to="/login">
          login
        </Link>
      </p>
    </div>
  );
};

const userRegister = async (register, userData, reset) => {
  try {
    const { user } = await register(userData.email, userData.pass);
    await updateProfile(user, {
      displayName: userData.fullName,
      photoURL: userData?.profileLink,
    });
    Alert.fire({
      icon: "success",
      title: "Account is created!",
      text: `"${user.email}"`,
    });
    reset();
  } catch (err) {
    errorStatus(err);
    reset();
  }
};

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

export default Register;
