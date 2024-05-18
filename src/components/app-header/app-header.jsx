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
              <a href="/" className={`${styles.link} pt-4 pb-4 pl-5 pb-5`}>
                <BurgerIcon type="primary" />
                <p>Конструктор</p>
              </a>
              <a href="/" className={`${styles.link} pt-4 pb-4 pl-5 pb-5`}>
                <ListIcon />
                <p>Лента заказов</p>
              </a>
            </div>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li>
            <a href="/" className={`${styles.link} pt-4 pb-4 pl-5 pb-5`}>
              <ProfileIcon />
              <p>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
