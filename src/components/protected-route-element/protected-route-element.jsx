import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element, notAuth = false }) => {
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const isLoading = useSelector((state) => state.user.isLoading);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (notAuth && isUserAuth && !isLoading) return <Navigate to={from} />;
  if (!notAuth && !isUserAuth && !isLoading)
    return <Navigate to="/login" state={{ from: location }} />;

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.object.isRequired,
  notAuth: PropTypes.bool,
};
