import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../hooks/useReducer';
import { ViewOrder } from "../../../components/order-feed/order-view/order-view";//'../../components/modal/order-view/order-view';
import { WS_ORDERS_START, WS_CONNECTION_CLOSED } from '../../../services/actions/websocket';
import styles from './view-feed.module.css';



export const ViewFeedPage:FC = () => {

    const orders = useSelector((state) => state.websocket.orders)
    const dispatch = useDispatch();
    useEffect(
        () => {
            
                dispatch({ type: WS_ORDERS_START, payload: 'orders/all' });
                return () => {
                    setTimeout(() => dispatch({ type: WS_CONNECTION_CLOSED }),10000);
                }
            
        }, [dispatch]
    );

    const { id } = useParams();
    const item = orders!.find((item) => item._id === id)
    
    return (
        <>
            {
                orders!.length > 0 &&
                <div className={styles.content}>
                    <ViewOrder item={item!} />
                </div>
            }
        </>
    );
}