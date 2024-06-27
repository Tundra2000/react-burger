import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import Modal from "../../modal/modal";
import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientPropTypes } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import {
  SET_DETAIL_INGREDIENT,
  CLEAR_DETAIL_INGREDIENT,
} from "../../../services/actions/ingredient-detail";
import { useLocation, useNavigate } from 'react-router-dom';


export default function IngridientCard({ item }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = React.useState(false);
  const { counts, bun } = useSelector((store) => store.burgerConstructor);
  //Счётчик добавленных в карзину элементов
  const count = bun?._id === item._id ? 2 : counts[item._id];

  //Перетаскивание
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const openModal = (data) => {
    console.log(data);
    dispatch({
      type: SET_DETAIL_INGREDIENT,
      ingredient: data,
    }); 
    setVisible(true);
    window.history.replaceState(null, data.name, "/ingredients/" + data._id);
    //navigate(`/ingredients/${data._id}`, { state: { background: location } });
  };

  const closeModal = () => {
    dispatch({
      type: CLEAR_DETAIL_INGREDIENT,
      ingredient: {},
    });
    setVisible(false);
    navigate('/');
  };

  const handleIngredientClick = () => {
    window.history.replaceState(null, null, "/");
    console.log(item);
    dispatch({
      type: SET_DETAIL_INGREDIENT,
      ingredient: item,
    }); 
    navigate(`/ingredients/${item._id}`, { state: { background: location } });
  };

  return (
    <div>
      <div
        className={styles.item}
        key={item._id}
        onClick={() => openModal(item)}
        ref={dragRef}
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
        <Modal header="" onClose={closeModal} childrenClick={handleIngredientClick}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

IngridientCard.propTypes = {
  item: IngredientPropTypes.isRequired,
};
