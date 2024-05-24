import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from '../modal/modal';
import React from 'react';

export default function BurgerConstructor(props) {
  const [visible, setVisible] = React.useState(false);

  const bun = props.data.find((item) => item.type === "bun");
  const sauce = props.data.find((item) => item.type === "sauce");
  const main = props.data.find((item) => item.type === "main");
  let price = 1000;//bun.price * 2 + sauce.price + main.price;

  const  openModal = (data) => {
    setVisible(true);
  }
  
  const closeModal = () => {
    setVisible(false);
  }

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
            <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
              Оформить заказ
            </Button>
          </p>
        </div>
      </div>
      {
        visible && 
          (
            <Modal header="Внимание!" onClose={closeModal}> 
              
              <h1>Спасибо за внимание!</h1>
              
            </Modal> 
          ) 
      }
    </>
  );
}
