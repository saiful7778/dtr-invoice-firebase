import { LuMenuSquare, LuMoon, LuSun, LuMail } from "react-icons/lu";
import useStateData from "../../hooks/useStateData";
import siteLogo from "../../assets/img/icon/invoice-logo.png";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { theme, handleThemeChange } = useStateData();
  return (
    <div className="con-bg fixed left-0 top-0 z-[100] flex h-14 w-full items-center justify-between gap-2 border-b p-2">
      <div className="flex items-center gap-2">
        <button className="btn-icon" type="button">
          <LuMenuSquare size={25} strokeWidth={1} />
        </button>

        <img
          className="border-color h-9 w-9 rounded-full border bg-white p-0.5 shadow"
          src={siteLogo}
          alt="site logo"
        />
        <h4 className="hidden select-none text-xl font-bold sm:block">
          DTR - Invoice
        </h4>
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
        <Link to="/login" className="btn btn-pri hidden">
          Login
        </Link>
        <Link to="/register" className="btn btn-pri-outline max-sm:hidden">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
