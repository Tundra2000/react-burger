import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import data from "../../data/data.json";

export default function BurgerConstructor() {
  const bun = data.find((item) => item.type === "bun");
  const sauce = data.find((item) => item.type === "sauce");
  const main = data.find((item) => item.type === "main");
  let price = bun.price * 2 + sauce.price + main.price;

  return (
    <>
      <div className=""></div>
      <div className={styles.container}>
        <div className={styles.box}>
          <ConstructorElement
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>

        <div className={styles.box}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={sauce.name}
            price={sauce.price}
            thumbnail={sauce.image_mobile}
          />
        </div>

        <div className={styles.box}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={main.name}
            price={main.price}
            thumbnail={main.image_mobile}
          />
        </div>

        <div className={styles.box}>
          <ConstructorElement
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      </div>

      <div style={{ float: "right" }}>
        <p>
          {price + " "}
          <CurrencyIcon type="primary" />
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
        </p>
      </div>
    </>
  );
}
