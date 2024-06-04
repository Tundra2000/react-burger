import styles from "./ingredient-details.module.css";
import { IngredientPropTypes } from "../../utils/utils";

export default function IngredientDetails(props) {
  return (
    <div>
      <p>
        <img
          src={props.props.image}
          className={styles.image}
          alt={props.props.name}
        />
      </p>
      <p className={styles.name}>
        {props.props.name}
      </p>
      <div className={styles.description}>
        <div className={styles.text_block}>
          <p className={styles.text}>
            Калории,ккал 
          </p>
          <p className={styles.text}>
            {props.props.calories}
          </p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>
            Белки,г 
          </p>
          <p className={styles.text}>
            {props.props.proteins}
          </p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>
            Жиры,г 
          </p>
          <p className={styles.text}>
            {props.props.fat}
          </p>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>
            Углеводы,г 
          </p>
          <p className={styles.text}>
            {props.props.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
    props: IngredientPropTypes
}