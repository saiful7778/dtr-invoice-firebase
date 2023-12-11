import { useState, useRef } from "react";
import { Spinner } from "keep-react";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { resetPasswordSchema } from "../../schemas/auth";
import useAuth from "../../hooks/useAuth";
import errorStatus from "../../utilities/errorStatus";
import Alert from "../../config/Alert";
import ReCAPTCHA from "react-google-recaptcha";

const Reset = () => {
  const { resetPassword } = useAuth();
  const recaptchaRef = useRef(null);
  const [spinner, setSpinner] = useState(false);

  const initialValues = {
    email: "",
  };

  const submitData = async (e, { resetForm }) => {
    setSpinner(true);
    const captchaValue = recaptchaRef.current.getValue();
    if (!captchaValue) {
      Alert.fire({
        icon: "warning",
        text: "Please verify the reCAPTCHA!",
      });
      return setSpinner(false);
    }
    try {
      const res = await fetch(
        "https://dtr-invoice-server.vercel.app/captcha/verify",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ captchaValue }),
        },
      );
      const data = await res.json();
      if (data?.success) {
        await resetPassword(e.email);
        Alert.fire({
          icon: "info",
          text: "The reset password email has been sent to your email address.",
        });
      } else {
        Alert.fire({
          icon: "error",
          text: "Invalid reCaptcha!",
        });
      }
      resetForm();
      setSpinner(false);
    } catch (err) {
      console.log(err);
      errorStatus(err);
      resetForm();
      setSpinner(false);
    }
  };

  return (
    <div className="con-bg border-color mx-auto rounded-md border p-4 md:w-1/2">
      <h3 className="text-center text-2xl font-bold md:text-4xl">
        Reset password
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordSchema}
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
                  autoComplete="username"
                  placeholder="Email address"
                  {...field}
                />
                {error && touched && (
                  <p className="mt-1 text-body-6 text-red-500">{error}</p>
                )}
              </div>
            )}
          </Field>
          <ReCAPTCHA
            size="compact"
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_SITE_KEY}
          />
          <button
            disabled={spinner}
            className="btn btn-pri w-full"
            type="submit"
          >
            {spinner ? <Spinner color="info" size="sm" /> : "Reset"}
          </button>
        </Form>
      </Formik>
      <p className="mt-2 text-center text-body-5 text-gray-400">
        Do you want to
        <Link className="link mx-1" to="/manage/register">
          register
        </Link>
        or
        <Link className="link mx-1" to="/manage/login">
          login
        </Link>
      </p>
    </div>
  );
};

export default Reset;
