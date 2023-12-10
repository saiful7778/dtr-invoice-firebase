import { Outlet } from "react-router-dom";
import Topbar from "./shared/Topbar";
import Alert from "../config/Alert";

const MainLayout = () => {
  const handleAlert = () => {
    Alert.fire({
      title: "Account is created!",
    });
  };
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-50">
      <header>
        <Topbar />
      </header>
      <aside></aside>
      <main className="mt-14 w-full p-4">
        <button onClick={handleAlert} className="btn btn-pri" type="button">
          Alert
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
