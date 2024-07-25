import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./bun.module.css";
import { useSelector } from "react-redux";
import { IIngredient } from "../../utils/types";

interface IBunPosition {
  position: 'top' | 'bottom'
}

const Bun = ({ position }:IBunPosition) => {
  const bun: IIngredient = useSelector((store: any) => store.burgerConstructor.bun);
  const isEmpty = !bun;
  const positionText: string = position === "top" ? "(верх)" : "(низ)";

  return (
    <div className={isEmpty ? styles.bun_empty : styles.bun}>
      {!isEmpty ? (
        <ConstructorElement
          type={position}
          isLocked={true}
          text={`${bun.name} ${positionText}`}
          price={bun.price}
          thumbnail={bun.image}
        />
      ) : (
        <ConstructorElement
          type={position}
          text={"Место для аппетитной булки"}
          thumbnail=''
          price={0}
        />
      )}
    </div>
  );
};

export default Bun;