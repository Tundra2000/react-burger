import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

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
    props: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired
      }).isRequired
}