import OrderDone from "../../../images/done.PNG";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const { order } = useSelector((store) => store.order);

  return (
    <div>
      <p className={styles.number}>{order}</p>
      <p className={styles.text_1}>идентификатор заказа</p>
      <img src={OrderDone} className={styles.image} alt="OrderDone" />
      <p className={styles.text_2}>Ваш заказ начали готовить</p>
      <p className={styles.text_3}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
