import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import Modal from "../../modal/modal";
import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";

export default function IngridientCard({ item, count }) {
  const [visible, setVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  const openModal = (data) => {
    setVisible(true);
    setModalData(data);
  };

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <div>
      <div
        className={styles.item}
        key={item._id}
        onClick={() => openModal(item)}
      >
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
      {visible && (
        <Modal header="" onClose={closeModal}>
          <IngredientDetails props={modalData} />
        </Modal>
      )}
    </div>
  );
}

IngridientCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired
  }).isRequired
};
