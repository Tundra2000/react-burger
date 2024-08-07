import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "../../../hooks/useReducer";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../../pages/not-found/not-found";
import { useEffect } from "react";
import { SET_DETAIL_INGREDIENT } from "../../../services/actions/ingredient-detail";

export default function IngredientDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let currentIngredient = useSelector((store) => store.ingredientDetail.ingredient);
  let ingredientsData  = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    if (!currentIngredient && id && ingredientsData) {
        const ingredient = ingredientsData.find((ingredient) => ingredient._id === id);
        dispatch({
            type: SET_DETAIL_INGREDIENT,
            ingredient: ingredient,
        })
    }
}, [currentIngredient, id, ingredientsData, dispatch]);


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
