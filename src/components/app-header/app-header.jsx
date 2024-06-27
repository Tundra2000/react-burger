import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink } from "react-router-dom";
//login
export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.nav_menu}>
          <NavLink className={({ isActive }) => (isActive ? styles.link_active : styles.link)} to={"/"} >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Конструктор</span>
            </>
          )}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.link_active : styles.link)} to={"/orders"} >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Лента заказов</span>
            </>
          )}
          </NavLink>  
          <Link className={styles.logo} to={"/"}>
            <Logo />
          </Link>
          <NavLink className={styles.link} to={"/login"}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Авторизация</span>
            </>
          )} 
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.link_active : styles.link)} to={"/profile"}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <span className={isActive ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>Личный кабинет</span>
            </>
          )}
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}