import styles from "./ingredient-details.module.css";
import { useSelector } from "../../../hooks/useReducer";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../../pages/not-found/not-found";
import { IIngredient } from "../../utils/types";

export default function IngredientDetails() {
  const { id } = useParams();

  let currentIngredient = useSelector((store) => store.ingredientDetail.ingredient);

  let ingredientsData  = useSelector((store:any) => store.ingredients.ingredients);

  if (!currentIngredient && ingredientsData.length > 0)
    currentIngredient = ingredientsData.find((item: { _id: string | undefined; }) => item._id === id);

  return currentIngredient ? (
    <div className={styles.modal}>
      <p>
        <img
          src={currentIngredient.image_large}
          className={styles.image}
          alt={currentIngredient.name}
        />
      </p>     
      <p className={styles.name}>{currentIngredient.name}</p>
      <div className={styles.description}>
        <div className={styles.text_block}>
          <p className={styles.text}>Калории,ккал</p>
          <p className={styles.text}>{currentIngredient.calories}</p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>Белки,г</p>
          <p className={styles.text}>{currentIngredient.proteins}</p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>Жиры,г</p>
          <p className={styles.text}>{currentIngredient.fat}</p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>Углеводы,г</p>
          <p className={styles.text}>{currentIngredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  ): (
    <NotFoundPage />
  );
}
