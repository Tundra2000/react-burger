import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsMenu from "./ingredients-menu/ingredients-menu";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

export default function BurgerIngredients({ data }) {
  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={styles.tab}>
          <Tab value="bun">Булки</Tab>
          <Tab value="sauce">Соусы</Tab>
          <Tab value="main">Начинки</Tab>
        </div>
        <div className={styles.scroller}>{<IngridientsMenu data={data} />}</div>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
};
