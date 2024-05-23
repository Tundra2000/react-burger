import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

export default function IngridientCard({ item }) {
  return (
    <>
                <div className={styles.item} key={item._id}>
                  <Counter count={item.count} />
                  <picture className={styles.picture}>
                    <img className={styles.image} src={item.image} alt={item.name} />
                    <span className={styles.price}>
                        {item.price}
                        <CurrencyIcon type="primary" />
                    </span>
                      <p className={styles.text}>
                        {item.name}
                      </p>
                  </picture>
                </div>
    </>
  );
}
