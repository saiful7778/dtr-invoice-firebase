import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Spinner } from "keep-react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userData, loader } = useAuth();
  const location = useLocation();
  if (loader) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }
  if (userData) {
    return children;
  }
  return <Navigate to="/manage/login" state={{ from: { location } }} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
