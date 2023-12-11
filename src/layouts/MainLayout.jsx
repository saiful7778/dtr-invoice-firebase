import { Outlet } from "react-router-dom";
import Topbar from "./shared/Topbar";
import SidebarComp from "./shared/SidebarComp";
import useStateData from "../hooks/useStateData";

const MainLayout = () => {
  const { showSidebar } = useStateData();
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-50">
      <header>
        <Topbar />
      </header>
      <aside>
        <SidebarComp />
      </aside>
      <main
        className={`mt-14 p-2 duration-300 ${
          showSidebar ? "md:ml-56" : "md:ml-[60px]"
        }`}
      >
        <div className="con-bg border-color rounded-md border p-2 shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
