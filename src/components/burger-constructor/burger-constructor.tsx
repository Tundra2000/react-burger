import { useMemo } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { useDispatch, useSelector } from "../../hooks/useReducer";
import Bun from "./bun/bun";
import IngredientsList from "./ingredient-list/ingredient-list";
import { useDrop } from "react-dnd";
import { ADD_TO_CONSTRUCTOR } from "../../services/actions/constructor";
//@ts-ignore
import { v4 as add_uuid } from "uuid";
import {
  postOrder,
  ORDER_MODAL_CLOSE,
  ORDER_MODAL_OPEN,
} from "../../services/actions/order";
import { useNavigate } from "react-router-dom";
import { IIngredient } from "../utils/types";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bun, filling } = useSelector((store) => store.burgerConstructor);
  const { isVisible } = useSelector((store) => store.order);

  const { isUserAuth } = useSelector((store) => store.user);

  //`action creator` для добавления уникального id ингредиента
  const addToConstructor = (item: IIngredient) => {
    return {
      type: ADD_TO_CONSTRUCTOR,
      item: {
        ...item,
        uuid: add_uuid(),
      },
    };
  };

  //Перетаскивание
  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addToConstructor(item as IIngredient));
    },
  });

  //Расчёт цены
  const totalPrice = useMemo(() => {
    if (bun != null || filling.length > 0) {
      const bunPrice = bun != null ? bun.price * 2 : 0;
      console.log(bunPrice);
      const fillingPrice = filling.reduce((acc: number, cur: IIngredient) => acc + cur.price, 0);
      console.log(fillingPrice);
      const total = bunPrice + fillingPrice;
      return total;
    } else {
      const total = 0;
      return total;
    }
  }, [bun, filling]);

  //Расчёт ингредиентов в заказе
  const idsArray = useMemo(() => {
    const itemsArr = filling.map((item: IIngredient) => item._id);
    if (bun) {
      itemsArr.push(bun._id);
      itemsArr.unshift(bun._id);
    }
    return itemsArr;
  }, [filling, bun]);

  // Открытие/Закрытие модального окна
  function openModal() {
    if (isUserAuth) { // авторизован?
      if (idsArray) {

        dispatch(postOrder( idsArray ));
        dispatch({
          type: ORDER_MODAL_OPEN,
        });
      }
    } else navigate("/login");
  }
  const closeModal = () => {
    dispatch({ type: ORDER_MODAL_CLOSE });
  };

  //Кнопка доступна, если в в кконструктор добавлены булки и что-нибудь ещё
  const isDisabled = (bun == null || idsArray.length < 2) ? true : false;

  const border = isHover ? "2px dashed green" : "none";
  /*data={bun}*/
  return (
    <>
      <div className={styles.container} ref={dropRef} style={{ border }}>
        <Bun position="top" />
        <div className={styles.scroller}>
          <IngredientsList />
        </div>
        <Bun position="bottom"/>
        <div className={styles.order}>
          <p className={styles.price}>
            {totalPrice + " "}
            <CurrencyIcon type="primary" />
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              disabled={isDisabled}
              onClick={openModal}
            >
              Оформить заказ
            </Button>
          </p>
        </div>
      </div>
      {isVisible && (
        <Modal header="" onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
