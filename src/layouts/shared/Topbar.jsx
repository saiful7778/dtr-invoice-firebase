import { LuMenuSquare, LuMoon, LuSun, LuMail } from "react-icons/lu";
import useStateData from "../../hooks/useStateData";
import siteLogo from "../../assets/img/icon/invoice-logo.png";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Avatar, Popover } from "keep-react";
import PropTypes from "prop-types";
import ProfilePopover from "../../components/ProfilePopover";

const Topbar = () => {
  const { theme, handleThemeChange, handleSiderBar } = useStateData();
  const location = useLocation();
  const { userData, logout } = useAuth();
  return (
    <div className="con-bg fixed left-0 top-0 z-[110] flex h-14 w-full items-center justify-between gap-2 border-b p-2">
      <div className="flex items-center gap-2">
        {!location.pathname.includes("manage") && (
          <button onClick={handleSiderBar} className="btn-icon" type="button">
            <LuMenuSquare size={25} strokeWidth={1} />
          </button>
        )}

        <Link className="flex items-center gap-2" to="/">
          <img
            className="border-color h-9 w-9 rounded-full border bg-white p-0.5 shadow"
            src={siteLogo}
            alt="site logo"
          />
          <h4 className="hidden select-none text-xl font-bold sm:block">
            DTR - Invoice
          </h4>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleThemeChange}
          title="Change theme"
          className="btn-icon"
          type="button"
        >
          {theme === "dark" ? (
            <LuMoon size={25} strokeWidth={1} />
          ) : (
            <LuSun size={25} strokeWidth={1} />
          )}
        </button>
        <button type="button" className="btn-icon">
          <LuMail size={25} strokeWidth={1} />
        </button>
        {userData ? (
          <UserLogged user={userData} logout={logout} />
        ) : (
          <UserLogout />
        )}
      </div>
    </div>
  );
};

const UserLogged = ({ user, logout }) => {
  return (
    <Popover
      className="con-bg border-color whitespace-nowrap rounded-lg border p-3 shadow"
      showDismissIcon={false}
      showArrow={false}
      position="bottom-end"
      additionalContent={<ProfilePopover user={user} logout={logout} />}
    >
      <Avatar
        className="cursor-pointer object-cover object-center"
        shape="circle"
        size="md"
        bordered={true}
        img={user?.photoURL ? user?.photoURL : null}
      />
    </Popover>
  );
};

UserLogged.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

const UserLogout = () => {
  return (
    <>
      <Link to="/manage/login" className="btn btn-pri hidden">
        Login
      </Link>
      <Link to="/manage/register" className="btn btn-pri-outline max-sm:hidden">
        Register
      </Link>
    </>
  );
};

export default Topbar;
