import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-menu.module.css";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

export function IngredientsMenu({ setCurrent }) {
  const { ingredients } = useSelector((store) => store.ingredients);

  const bunIngredients = useMemo(() => {
    return ingredients.filter((item) => item.type === "bun");
  }, [ingredients]);

  const sauceIngredients = useMemo(() => {
    return ingredients.filter((item) => item.type === "sauce");
  }, [ingredients]);

  const mainIngredients = useMemo(() => {
    return ingredients.filter((item) => item.type === "main");
  }, [ingredients]);

  const [bunRef, inViewBun] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
  const [mainRef, inViewMain] = useInView({ threshold: 0 });
  useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [setCurrent, inViewBun, inViewSauce, inViewMain]);

  return (
    <>
      <div className={styles.tab}>
        <h2 className={styles.title} ref={bunRef}>
          Булки
        </h2>
        <div className={styles.items}>
          {bunIngredients.map((bun) => (
            <IngredientCard item={bun} key={bun._id} />
          ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title} ref={sauceRef}>
          Соусы
        </h2>
        <div className={styles.items}>
          {sauceIngredients.map((sauce) => (
            <IngredientCard item={sauce} key={sauce._id} />
          ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title} ref={mainRef}>
          Начинки
        </h2>
        <div className={styles.items}>
          {mainIngredients.map((main) => (
            <IngredientCard item={main} key={main._id} count={0} />
          ))}
        </div>
      </div>
    </>
  );
}
