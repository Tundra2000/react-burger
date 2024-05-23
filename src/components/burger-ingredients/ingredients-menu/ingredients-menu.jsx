import IngredientCard from "../ingredient-card/ingredient-card";
import data from "../../../data/data.json";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-menu.module.css";

export default function IngredientsMenu() {
  return (
    <>
        <div className="">
          <h2 className={styles.title}>Булки</h2>
          <div className={styles.items}>
            {data
              .filter((item) => item.type === "bun")
              .map((bun) => (
                <div className={styles.item} key={bun._id}>
                  <Counter count={1} />
                  <div>
                    <img src={bun.image} alt={bun.name} />
                    <div>
                      <p className={styles.price}>
                        {bun.price}
                        <CurrencyIcon type="primary" />
                      </p>
                    </div>
                    <div>
                      <p className={styles.text}>
                        {bun.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className={styles.title}>Соусы</h2>
          <div className={styles.items}>
            {data
              .filter((item) => item.type === "sauce")
              .map((sauce) => (
                <div className={styles.item} key={sauce._id}>
                  <Counter count={1} />
                  <div>
                    <img src={sauce.image} alt={sauce.name} />
                    <div>
                      <p className={styles.price}>
                        {sauce.price}
                        <CurrencyIcon type="primary" />
                      </p>
                    </div>
                    <div>
                      <p className={styles.text}>
                        {sauce.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className={styles.title}>Начинки</h2>
          <div className={styles.items}>
            {data
              .filter((item) => item.type === "main")
              .map((main) => (
                <div className={styles.item} key={main._id}>
                  <Counter count={1} />
                  <div>
                    <img src={main.image} alt={main.name} />
                    <div>
                      <p className={styles.price}>
                        {main.price}
                        <CurrencyIcon type="primary" />
                      </p>
                    </div>
                    <div>
                      <p className={styles.text}>
                        {main.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
    </>
  );
}