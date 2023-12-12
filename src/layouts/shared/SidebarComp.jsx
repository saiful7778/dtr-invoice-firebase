import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaFileInvoice } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import useStateData from "../../hooks/useStateData";
import { Avatar, Popover } from "keep-react";
import useAuth from "../../hooks/useAuth";
import ProfilePopover from "../../components/ProfilePopover";

const SidebarComp = () => {
  const { userData, logout } = useAuth();
  const { showSidebar } = useStateData();

  return (
    <div
      className={`con-bg border-color fixed left-0 top-0 z-[100] flex min-h-screen flex-col justify-between whitespace-nowrap border-r pt-14 shadow duration-300 ${
        showSidebar ? "md:w-56" : "max-sm:-left-full md:w-[60px]"
      }`}
    >
      <Sidebar>
        <SidebarItem
          path="/"
          textShow={showSidebar}
          icon={<LuLayoutDashboard />}
        >
          Deshboard
        </SidebarItem>
        <SidebarItem
          path="/invoice"
          textShow={showSidebar}
          icon={<FaFileInvoice />}
        >
          Invoice
        </SidebarItem>
      </Sidebar>
      <div className="border-color border-y">
        {userData &&
          (showSidebar ? (
            <div className="inline-flex w-full items-center justify-between gap-1 overflow-hidden whitespace-normal p-2">
              <Avatar
                shape="circle"
                size="md"
                bordered={true}
                className="object-cover object-center"
                img={userData?.photoURL ? userData?.photoURL : null}
              />
              <div className="w-32 overflow-hidden">
                <h4 className="font-semibold leading-5">
                  {userData?.displayName}
                </h4>
                <div className="relative w-32">
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                  <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-r from-transparent to-gray-50 dark:to-gray-800"></div>
                </div>
              </div>
              <Popover
                className="con-bg border-color space-y-2 whitespace-nowrap rounded-lg border p-3 shadow"
                showDismissIcon={false}
                showArrow={false}
                position="top-start"
                additionalContent={
                  <ProfilePopover user={userData} logout={logout} />
                }
              >
                <button className="btn-icon" type="button">
                  <BsThreeDotsVertical size={20} />
                </button>
              </Popover>
            </div>
          ) : (
            <Popover
              className="con-bg border-color space-y-2 whitespace-nowrap rounded-lg border p-3 shadow"
              showDismissIcon={false}
              showArrow={false}
              position="right"
              additionalContent={
                <ProfilePopover user={userData} logout={logout} />
              }
            >
              <div className="w-full cursor-pointer p-2.5">
                <Avatar
                  shape="circle"
                  size="md"
                  bordered={true}
                  className="object-cover object-center"
                  img={userData?.photoURL ? userData?.photoURL : null}
                />
              </div>
            </Popover>
          ))}
      </div>
    </div>
  );
};

const Sidebar = ({ children }) => {
  return (
    <ul className="flex h-[50vh] w-full flex-grow flex-col gap-2 overflow-y-auto overflow-x-hidden p-2">
      {children}
    </ul>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

const SidebarItem = ({ children, path, icon, textShow }) => {
  return (
    <li>
      <NavLink
        className={({ isActive, isPending }) =>
          (isPending
            ? "animate-pulse"
            : isActive
              ? "bg-gray-300 dark:bg-gray-700"
              : "ring-1 ring-gray-300 dark:ring-gray-700") +
          " inline-flex w-full items-center overflow-hidden rounded-md px-3 py-2 font-medium duration-100" +
          (!textShow ? " justify-center" : "")
        }
        to={path}
      >
        <span>{icon}</span>
        <span className={textShow ? "ml-1" : "w-0 overflow-hidden"}>
          {children}
        </span>
      </NavLink>
    </li>
  );
};

SidebarItem.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string,
  icon: PropTypes.element,
  textShow: PropTypes.bool,
};

export default SidebarComp;
