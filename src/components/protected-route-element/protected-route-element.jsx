import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";
import { getUser } from "../../services/actions/user";

export const ProtectedRouteElement = ({ element, notAuth = false }) => {
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const isLoading = useSelector((state) => state.user.isLoading);

  const location = useLocation();
  const from = location.state?.from || "/";

  const cookie = getCookie("token");
  const dispatch = useDispatch();
  if (!isUserAuth && cookie && cookie !== "" && !isLoading) {
    dispatch(getUser("get"));
  }

  if (notAuth && isUserAuth && !isLoading) return <Navigate to={from} />;
  if (!notAuth && !isUserAuth && !isLoading)
    return <Navigate to="/login" state={{ from: location }} />;

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.object.isRequired,
  notAuth: PropTypes.bool,
};
