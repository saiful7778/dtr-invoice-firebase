import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="con-bg border-color mx-auto rounded-md border p-4 md:w-1/2">
      <h3 className="text-center text-2xl font-bold md:text-4xl">
        Login your account
      </h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input className="input" placeholder="Email address" type="email" />
        <input className="input" placeholder="Password" type="password" />
        <button className="text-body-5 text-gray-400" type="button">
          Forget password?
        </button>
        <button className="btn btn-pri w-full" type="submit">
          Login
        </button>
      </form>
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
