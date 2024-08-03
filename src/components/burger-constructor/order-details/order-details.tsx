import OrderDone from "../../../images/done.svg";
import styles from "./order-details.module.css";
import { useSelector } from "../../../hooks/useReducer";

export default function OrderDetails() {
  const { order, orderRequest, orderFailed } = useSelector(
    (store) => store.order
  );

  return (
    <>
      {orderRequest ? (
        <h2>Идет загрузка данных...</h2>
      ) : orderFailed ? (
        <h2>Произошла ошибка</h2>
      ) : (
        <div>
          <p className={styles.number}>{order}</p>
          <p className={styles.text_1}>идентификатор заказа</p>
          <img src={OrderDone} className={styles.image} alt="OrderDone" />
          <p className={styles.text_2}>Ваш заказ начали готовить</p>
          <p className={styles.text_3}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </>
  );
}
