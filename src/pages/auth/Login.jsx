import { useState } from "react";
import { Spinner } from "keep-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "../../schemas/auth";
import errorStatus from "../../utilities/errorStatus";
import Alert from "../../config/Alert";

const Login = () => {
  const { login } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const submitData = async (e, { resetForm }) => {
    setSpinner(true);
    try {
      const { user } = await login(e.email, e.password);
      Alert.fire({
        icon: "success",
        title: `Welcome, ${user.displayName}`,
      });
      setSpinner(false);
      resetForm();
    } catch (err) {
      errorStatus(err);
      setSpinner(false);
      resetForm();
    }
  };

  const handleForgetPassword = (e) => {
    e();
  };

  return (
    <div className="con-bg border-color mx-auto rounded-md border p-4 md:w-1/2">
      <h3 className="text-center text-2xl font-bold md:text-4xl">
        Login your account
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={submitData}
      >
        <Form className="mt-4 space-y-2">
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
          <button
            onClick={() => handleForgetPassword()}
            className="text-body-5 text-gray-400"
            type="button"
          >
            Forget password?
          </button>
          <button
            disabled={spinner}
            className="btn btn-pri w-full"
            type="submit"
          >
            {spinner ? <Spinner color="info" size="sm" /> : "Login"}
          </button>
        </Form>
      </Formik>
      <p className="mt-2 text-center text-body-5 text-gray-400">
        Don{`'`}t have an account?
        <Link className="link ml-1" to="/register">
          register
        </Link>
      </p>
    </div>
  );
};

export default Login;
