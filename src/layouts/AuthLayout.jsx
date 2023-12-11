import { Outlet } from "react-router-dom";
import Topbar from "./shared/Topbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-50">
      <header>
        <Topbar />
      </header>
      <main className="mt-14 p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
