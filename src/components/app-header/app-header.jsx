/* eslint-disable no-unreachable */
/*import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import {  BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css' ;
import { NavLink, Link } from "react-router-dom";
*/

import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css' ;

export default function AppHeader(){
    return(
    <header className={styles.header}>
      <nav className={styles.navbar}>
      <ul className={styles.nav_menu}>
            <li>
              <div className={styles.item_wrapper}>
                <div>
                    <p>Конструктор</p>
                    <BurgerIcon />
                </div>
                <div>
                    <p>Лента заказов</p>
                    <ListIcon />
                </div>
            </div>
            </li>
            <li className={styles.logo}>
              <Logo />
           </li>
            <li>
              <div>
                <p>Личный кабинет</p>
                <ProfileIcon />
              </div>
            </li>
        </ul>
      </nav>
    </header>
    );
}