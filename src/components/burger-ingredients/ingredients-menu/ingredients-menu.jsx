import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-menu.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/utils";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function IngredientsMenu({setCurrent}) {
  const { ingredients } = useSelector(store => store.ingredients);

  const [bunRef, inViewBun] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
  const [mainRef, inViewMain] = useInView({ threshold: 0 });

  const bunIngredients = useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);

  const sauceIngredients = useMemo(() => {
    return ingredients.filter((item) => item.type === "sauce");
  }, [ingredients]);

  const mainIngredients = useMemo(() => {
    return ingredients.filter((item) => item.type === "main");
  }, [ingredients]);

  useEffect(() => {
    if (inViewBun) {
        setCurrent('bun')
    } else if (inViewSauce) {
        setCurrent('sauce')
    } else if (inViewMain) {
        setCurrent('main')
    } 
}, [setCurrent, inViewBun, inViewSauce, inViewMain])

  return (
    <>
      <div className={styles.tab}>
        <h2 className={styles.title}  refs={bunRef}>Булки</h2>
        <div className={styles.items}>
          {bunIngredients
            .map((bun) => (
              <IngredientCard item={bun} key={bun._id} count={1} />
            ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title} refs={sauceRef}>Соусы</h2>
        <div className={styles.items}>
          {sauceIngredients
            .map((sauce) => (
              <IngredientCard item={sauce} key={sauce._id} count={0} />
            ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title} refs={mainRef}>Начинки</h2>
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
 // data: PropTypes.arrayOf(IngredientPropTypes).isRequired
};
