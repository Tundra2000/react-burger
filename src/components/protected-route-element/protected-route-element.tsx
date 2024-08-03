import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../../hooks/useReducer";
import { getCookie } from "../utils/cookie";
import { getUser } from "../../services/actions/user";
import { ReactElement } from "react";

interface IProtectedRoute {
  element: ReactElement;
  notAuth?: boolean;
}

export const ProtectedRouteElement = ({
  element,
  notAuth = false,
}: IProtectedRoute) => {
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const isLoading = useSelector((state) => state.user.isLoading);

  const location = useLocation();
  const from = location.state?.from || "/";

  console.log(location);
  console.log(isUserAuth);
  console.log(isLoading);

  const cookie = getCookie("token");
  const dispatch = useDispatch();
  if (!isUserAuth && cookie && cookie !== "" && !isLoading) {
    dispatch(getUser());
  }

  if (notAuth && isUserAuth && !isLoading) 
    return <Navigate to={from} />;
  if (!notAuth && !isUserAuth && !isLoading)
    return <Navigate to="/login" state={{ from: location }} />;

  return element;
};