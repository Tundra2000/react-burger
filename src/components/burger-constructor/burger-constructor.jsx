import React, { useMemo } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import Bun from "./bun/bun";
import IngredientsList from "./ingredient-list/ingredient-list";
import { useDrop } from "react-dnd";
import { ADD_TO_CONSTRUCTOR } from "../../services/actions/constructor";
import { v4 as add_uuid } from "uuid";
import { postOrder, ORDER_MODAL_CLOSE } from "../../services/actions/order";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, filling } = useSelector((store) => store.burgerConstructor);
  const { order, isVisible } = useSelector((store) => store.order);

  //Перетаскивание
  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_TO_CONSTRUCTOR,
        item: { ...item, uuid: add_uuid() },
      });
    },
  });

  //Расчёт цены
  const totalPrice = useMemo(() => {
    if (bun != null || filling.length > 0) {
      const bunPrice = bun != null ? bun.price * 2 : 0;
      console.log(bunPrice);
      const fillingPrice = filling.reduce((acc, cur) => acc + cur.price, 0);
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
    const itemsArr = filling.map((item) => item._id);
    if (bun) {
      itemsArr.push(bun._id);
    }
    return itemsArr;
  }, [filling, bun]);

  // Открытие/Закрытие модального окна
  function openModal() {
    if (idsArray) {
      dispatch(postOrder({ ingredients: idsArray }));
    }
  }
  const closeModal = () => {
    console.log(order.number);
    dispatch({ type: ORDER_MODAL_CLOSE });
  };

  const border = isHover ? "2px dashed green" : "none";
  return (
    <>
      <div className={styles.container} ref={dropRef} style={{ border }}>
        <Bun position="top" data={bun} />
        <div className={styles.scroller}>
          <IngredientsList />
        </div>
        <Bun position="bottom" data={bun} />
        <div className={styles.order}>
          <p className={styles.price}>
            {totalPrice + " "}
            <CurrencyIcon type="primary" />
            <Button
              htmlType="button"
              type="primary"
              size="medium"
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
