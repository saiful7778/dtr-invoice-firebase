import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="con-bg border-color mx-auto rounded-md border p-4 md:w-1/2">
      <h3 className="text-center text-2xl font-bold md:text-4xl">
        Register an account
      </h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input className="input" placeholder="Full Name" type="text" />
        <input className="input" placeholder="Email address" type="email" />
        <input className="input" placeholder="Password" type="password" />
        <button className="btn btn-pri w-full" type="submit">
          Register
        </button>
      </form>
      <p className="mt-2 text-center text-body-5 text-gray-400">
        Do you have an account?
        <Link className="link ml-1" to="/login">
          login
        </Link>
      </p>
    </div>
  );
};

export default Register;
