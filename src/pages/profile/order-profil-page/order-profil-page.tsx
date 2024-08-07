import React, { useEffect, FC } from 'react';
import styles from './order-profil-page.module.css';
import { useSelector, useDispatch } from '../../../hooks/useReducer';
import { WS_ORDERS_START, WS_CONNECTION_CLOSED } from '../../../services/actions/websocket'
import { OrderCard } from '../../../components/order-feed/order-card';
import { IOrder } from '../../../components/utils/types';
import { getCookie } from '../../../components/utils/cookie';
import { NotFoundPage } from '../../not-found/not-found';

export const OrdersProfilePage: FC = () => {

    const orders = useSelector((state) => state.websocket.orders)
    const cookie = getCookie('token');
    const dispatch = useDispatch();

    useEffect(
        () => {
                dispatch({ type: WS_ORDERS_START, payload: 'orders', token: cookie });
                return () => {
                    setTimeout(() => dispatch({ type: WS_CONNECTION_CLOSED }),500000);
                }
            
        }, [cookie, dispatch]
    );

    return (orders?(
        <div className={styles.container}>
                <div className={`p-2 ${styles.orders} ${styles.scrollbar}`}>
                    {
                        
                    orders.slice(0).reverse().map((item: IOrder, index: React.Key) => (
                        <OrderCard key={index} item={item}/>
                    )
                    )
                    }
                </div>
        </div>):
        (
            <>
            <NotFoundPage/>
            </>
        )
    );
}