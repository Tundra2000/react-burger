import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsMenu from "../ingridients-menu/ingridients-menu";
import styles from './burger-ingridients.module.css';

export default function BurgerIngredients() {
  return (
    <>
      <h1>Соберите бургер</h1>
      <div style={{display: 'flex'}}>
        <Tab value="bun">Булки</Tab>
        <Tab value="sauce">Соусы</Tab>
        <Tab value="main">Начинки</Tab>
      </div>
      <div className={styles.container}>
        <IngridientsMenu />
      </div>
    </>
  );
}
