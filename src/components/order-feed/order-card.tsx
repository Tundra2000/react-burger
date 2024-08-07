import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../hooks/useReducer';
import { IIngredient, IOrder } from '../utils/types';
import { ORDER_DETAIL } from '../../services/actions/order';
import { russianStatus } from '../utils/tools';
import { useLocation, useNavigate } from 'react-router-dom';


interface IOrderCard {
    item: IOrder;
}

export const OrderCard:FC<IOrderCard> = ({ item }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ingredients = useSelector((state) => state.ingredients.ingredients)
    let orderImgs = [];
    let totalPrice = 0;
    const orderIngredients = item.ingredients

    for (let i = 0; i < orderIngredients!.length; i++) {
        const tempIngredient = ingredients.find((item) => item._id === orderIngredients![i]) as IIngredient;
        totalPrice += tempIngredient.price;
        if (i <= 6) {
            if (i === 6) {
                orderImgs.push(
                    <li className={styles.ingredient} key={i}>
                        <img src={tempIngredient.image_large} alt='ingredient' />
                        <div className={`${styles.last_ingredient} text text_type_digits-default`}>
                            +{orderIngredients!.length - i}
                        </div>
                    </li>
                );
            } else {
                orderImgs.push(
                    <li className={styles.ingredient} key={i}>
                        <img src={tempIngredient.image_large} alt='ingredient' />
                    </li>
                );
            }
        }
    }

function openModal() {
    dispatch({
      type: ORDER_DETAIL,
      data: { ...item }
    });
    navigate(`${location.pathname}/${item.number}`, { state: { background: location } });
  };
    return (
        <>
        <div className={`p-6 mb-4 ${styles.order}`} 
        onClick={() => openModal()}>
            <div className={`mb-6 ${styles.stats}`}>
                <p className="text text_type_digits-medium">
                    #{item.number}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(item.createdAt)} />
                </p>
            </div>
            <div className={`mb-6 ${styles.medium}`}>
                <p className="text text_type_main-medium">
                    {item.name}
                </p>
                {item.status && 
                    <p>{russianStatus(item.status)}</p>
                }
                
            </div>
            <div className={styles.desc}>
                <ul>
                    {orderImgs}
                </ul>
                <div className={styles.totalPrice}>
                <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                    
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
        </>
    )
};