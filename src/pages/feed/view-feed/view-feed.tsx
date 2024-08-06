import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../hooks/useReducer';
import { ViewOrder } from "../../../components/order-feed/order-view/order-view";
import styles from './view-feed.module.css';
import { getOrderByNumber } from '../../../services/actions/order';
import { NotFoundPage } from '../../not-found/not-found';



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
        }, [dispatch, id, item]
    );

    
    return item ? (
        <>
                <div className={styles.content}>
                    {<ViewOrder item={item!} />}
                </div>
        </>
    ):(<><NotFoundPage/></>);
}