import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const { ingredient } = useSelector((store) => store.ingredientDetail);
  return (
    <div>
      <p>
        <img
          src={ingredient.image}
          className={styles.image}
          alt={ingredient.name}
        />
      </p>
      <p className={styles.name}>{ingredient.name}</p>
      <div className={styles.description}>
        <div className={styles.text_block}>
          <p className={styles.text}>Калории,ккал</p>
          <p className={styles.text}>{ingredient.calories}</p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>Белки,г</p>
          <p className={styles.text}>{ingredient.proteins}</p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>Жиры,г</p>
          <p className={styles.text}>{ingredient.fat}</p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>Углеводы,г</p>
          <p className={styles.text}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}