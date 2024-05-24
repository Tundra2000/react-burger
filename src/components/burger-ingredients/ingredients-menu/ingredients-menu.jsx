import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-menu.module.css";

export default function IngredientsMenu({data}) {
  return (
    <>
      <div className={styles.tab}>
        <h2 className={styles.title}>Булки</h2>
        <div className={styles.items}>
          {data
            .filter((item) => item.type === "bun")
            .map((bun) => (
              <IngredientCard item={bun} key={bun._id} count={1} />
            ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title}>Соусы</h2>
        <div className={styles.items}>
          {data
            .filter((item) => item.type === "sauce")
            .map((sauce) => (
              <IngredientCard item={sauce} key={sauce._id} count={0} />
            ))}
        </div>
      </div>

      <div className={styles.tab}>
        <h2 className={styles.title}>Начинки</h2>
        <div className={styles.items}>
          {data
            .filter((item) => item.type === "main")
            .map((main) => (
              <IngredientCard item={main} key={main._id} count={0} />
            ))}
        </div>
      </div>
    </>
  );
}
