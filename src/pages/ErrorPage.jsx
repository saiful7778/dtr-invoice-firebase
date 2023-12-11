import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const routerError = useRouteError();
  console.error(routerError);
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-50">
      <div className="space-y-3 text-center">
        <h3 className="text-3xl font-bold">404! not found</h3>
        <p>
          <i>{routerError.statusText}</i>
        </p>
        <p>
          <i>{routerError.data}</i>
        </p>
        <Link to="/" className="link">
          go to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
