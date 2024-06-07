import Ingredient from "../ingredient/Ingredient";
import styles from "./ingredient-list.module.css";
import { useSelector } from "react-redux";

const IngredientsList = () => {
  const { filling } = useSelector((store) => store.burgerConstructor);

  return (
    <ul className={styles.main_container}>
      {filling.length > 0 &&
        filling.map((item, index) => (
          <Ingredient
            key={item._id}
            item={item}
            id={item._id}
            type={item.type}
            index={index}
          />
        ))}
    </ul>
  );
};

export default IngredientsList;
