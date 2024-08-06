import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../hooks/useReducer';
import { ViewOrder } from "../../../components/order-feed/order-view/order-view";
import { WS_ORDERS_START, WS_CONNECTION_CLOSED } from '../../../services/actions/websocket';
import styles from './view-feed.module.css';
import { getOrderByNumber } from '../../../services/actions/order';



export const ViewFeedPage:FC = () => {
    const { id } = useParams();
    const orders = useSelector((state) => state.websocket.orders);
    const [item, setItem] = useState(orders!.find((item) => item._id === id));
    const dispatch = useDispatch();
    useEffect(
        () => {

            if (!item && id) {
            getOrderByNumber(id).then(result => {
                setItem(result.orders[0]);
            }).catch(console.error);
        }
                dispatch({ type: WS_ORDERS_START, payload: 'orders/all' });
                return () => {
                    setTimeout(() => dispatch({ type: WS_CONNECTION_CLOSED }),10000);
                }
            
        }, [dispatch, id, item]
    );

    
    return item ? (
        <>
            {
                orders!.length > 0 && item &&
                <div className={styles.content}>
                    {<ViewOrder item={item!} />}
                </div>
            }
        </>
    ):(<></>);
}