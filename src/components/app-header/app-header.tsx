import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.nav_menu}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            to={"/"}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <span
                  className={
                    isActive
                      ? styles.text
                      : styles.text_active
                  }
                >
                  Конструктор
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            to={"/feed"}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <span
                  className={
                    isActive
                      ? styles.text
                      : styles.text_active
                  }
                >
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
          <Link className={styles.logo} to={"/"}>
            <Logo />
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            to={"/profile"}
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <span
                  className={
                    isActive
                      ? styles.text
                      : styles.text_active
                  }
                >
                  Личный кабинет
                </span>
              </>
            )}
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
