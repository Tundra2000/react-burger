import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";
import { useSelector} from "react-redux";

export const ProtectedRouteElement = ({ element, notAuth = false }) => {
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const isLoading = useSelector((state) => state.user.isLoading);

  if (isUserAuth && notAuth && !isLoading) {
    return <Navigate to="/" />;;
  }

  if (!isUserAuth && !notAuth && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.elementType.isRequired,
  notAuth: PropTypes.bool.isRequired,
};
