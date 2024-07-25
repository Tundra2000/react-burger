import Ingredient from "../ingredient/Ingredient";
import styles from "./ingredient-list.module.css";
import { useSelector } from "react-redux";
import {IConstructorIngredient} from "../../utils/types";

const IngredientsList = () => {
  const { filling } = useSelector((store: any) => store.burgerConstructor);

  return (
    <ul className={styles.main_container}>
      {filling.length > 0 &&
        filling.map((item : IConstructorIngredient, index: number) => (
          <Ingredient
            key={item.uuid}
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
