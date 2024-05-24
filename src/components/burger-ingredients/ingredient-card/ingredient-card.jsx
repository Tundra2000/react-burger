import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import Modal from '../../modal/modal';
import React from 'react';

export default function IngridientCard({ item, count }) {
const [visible, setVisible] = React.useState(false);
const [modalData, setModalData] = React.useState({});

const  openModal = (data) => {
  setVisible(true);
  setModalData(data);
}

const closeModal = () => {
  setVisible(false);
}
  return (
    <div>
      <div className={styles.item} key={item._id} onClick={() => openModal(item)}>
      
        {count > 0 && <Counter count={count} />}
        <picture className={styles.picture}>
          <img className={styles.image} src={item.image} alt={item.name} />
          <span className={styles.price}>
            {item.price}
            <CurrencyIcon type="primary" />
          </span>
          <p className={styles.text}>{item.name}</p>
        </picture>

      </div>       
      {
        visible && 
          (
            <Modal header="Внимание!" onClose={closeModal}> 
              
              <h1>Спасибо за внимание!</h1>
              
            </Modal> 
          ) 
      }
    </div>  
  );
}
