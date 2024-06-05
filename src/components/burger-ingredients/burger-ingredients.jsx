import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsMenu } from "./ingredients-menu/ingredients-menu";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../utils/utils";
import { useState } from "react";

export default function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');


  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={styles.tab}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
        </div>
        <div className={styles.scroller}>{<IngredientsMenu setCurrent={setCurrent} />}</div>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
 // data: PropTypes.arrayOf(IngredientPropTypes).isRequired
};
