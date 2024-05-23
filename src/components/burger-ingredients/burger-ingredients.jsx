import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsMenu from "./ingredients-menu/ingredients-menu";
import styles from './burger-ingredients.module.css';

export default function BurgerIngredients() {
  return (
    <>
      <h1 className={styles.title}>Соберите бургер</h1>
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
