import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-menu.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/utils";
import { useMemo } from "react";

export function IngredientsMenu({ data }) {
  
  const bunIngredients = useMemo(() => {
    return data.filter((item) => item.type === "bun");
  }, [data]);

  const sauceIngredients = useMemo(() => {
    return data.filter((item) => item.type === "sauce");
  }, [data]);

  const mainIngredients = useMemo(() => {
    return data.filter((item) => item.type === "main");
  }, [data]);


  return (
    <>
      <div className={styles.tab}>
        <h2 className={styles.title}>Булки</h2>
        <div className={styles.items}>
          {bunIngredients
            .map((bun) => (
              <IngredientCard item={bun} key={bun._id} count={1} />
            ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title}>Соусы</h2>
        <div className={styles.items}>
          {sauceIngredients
            .map((sauce) => (
              <IngredientCard item={sauce} key={sauce._id} count={0} />
            ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title}>Начинки</h2>
        <div className={styles.items}>
          {mainIngredients
            .map((main) => (
              <IngredientCard item={main} key={main._id} count={0} />
            ))}
        </div>
      </div>
    </>
  );
}

IngredientsMenu.propTypes = {
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired
};
