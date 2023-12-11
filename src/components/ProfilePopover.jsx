import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfilePopover = ({ user, logout }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <ul className="space-y-1">
      <li className="border-color mb-2 border-b pb-2">{user?.displayName}</li>
      <li>
        <Link to="/manage/profile">Profile</Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="btn btn-pri btn-sm w-full"
          type="button"
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

ProfilePopover.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default ProfilePopover;
