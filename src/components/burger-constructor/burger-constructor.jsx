import React from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../utils/utils";

export default function BurgerConstructor({data}) {
  const [visible, setVisible] = React.useState(false);

  const bun = data.find((item) => item.type === "bun");
  const sauce = data.find((item) => item.type === "sauce");
  const main = data.find((item) => item.type === "main");
  let price = 1000;

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <ConstructorElement
            text={bun.name}
            price={bun.price}
            isLocked={true}
            thumbnail={bun.image_mobile}
          />
        </div>

        <div className={styles.scroller}>
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
            <DragIcon type="primary" />
            <ConstructorElement
              text={main.name}
              price={main.price}
              thumbnail={main.image_mobile}
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
            <DragIcon type="primary" />
            <ConstructorElement
              text={main.name}
              price={main.price}
              thumbnail={main.image_mobile}
            />
          </div>
        </div>

        <div className={styles.box}>
          <ConstructorElement
            text={bun.name}
            price={bun.price}
            isLocked={true}
            thumbnail={bun.image_mobile}
          />
        </div>

        <div className={styles.order}>
          <p className={styles.price}>
            {price + " "}
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
      {visible && (
        <Modal header="" onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired
};
