import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.nav_menu}>
          <li>
            <div className={styles.menu_wrapper}>
              <a href="/" className={styles.link}>
                <span className={styles.icon}>
                  <BurgerIcon />
                </span>
                <p className={styles.text}>Конструктор</p>
              </a>
              <a href="/" className={styles.link}>
                <span className={styles.icon}>
                  <ListIcon />
                </span>
                <p className={styles.text}>Лента заказов</p>
              </a>
            </div>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li>
            <a href="/" className={styles.link}>
              <span className={styles.icon}>
                <ProfileIcon />
              </span>
              <p className={styles.text}>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
