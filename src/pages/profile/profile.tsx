import { useDispatch } from "../../hooks/useReducer";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { userApi } from "../../services/actions/user";
import styles from "./profile.module.css";
import { FormEvent } from "react";
import { TLogout } from "../../data/apis/user-api/user-types";
import { postLogout } from "../../data/apis/user-api/user-api";

//profile — страница с настройками профиля пользователя.
export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //выход из учётной записи
  const logOut = async (e:FormEvent) => {
    e.preventDefault();
    dispatch(
      postLogout(
        {
          'token': localStorage.getItem("refreshToken"),
        } as TLogout, 
        () => navigate("/login")
      ));
/*
    dispatch(
      //@ts-ignore
      userApi(
          'logout', 
          {
            'token': localStorage.getItem("refreshToken"),
          }, 
          () => navigate("/login")
        )
    );*/
    
  };

  return (
    <div className={styles.content}>
      <div className={`${styles.sidebar} pr-15`}>
        <nav className="mb-20">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `text text_type_main-medium text_color_inactive ${styles.active}`
                : `text text_type_main-medium text_color_inactive`
            }
            to=""
            end
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `text text_type_main-medium text_color_inactive ${styles.active}`
                : `text text_type_main-medium text_color_inactive`
            }
            to="orders"
          >
            История заказов
          </NavLink>
          <Link
            className="text text_type_main-medium text_color_inactive"
            onClick={logOut} to={"/login"}          >
            Выход
          </Link>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
}
