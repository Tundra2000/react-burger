import { useEffect } from 'react';
import styles from './feed.module.css';
import { useSelector, useDispatch } from '../../hooks/useReducer';
import { WS_ORDERS_START, WS_CONNECTION_CLOSED } from '../../services/actions/websocket';
import { OrderCard } from '../../components/order-feed/order-card';
import { IOrder } from '../../components/utils/types';

export function FeedPage() {
  const orders = useSelector((state) => state.websocket.orders);
  const total = useSelector((state) => state.websocket.total);
  const totalToday = useSelector((state) => state.websocket.totalToday);
  const readyOrder = orders!.map((item) => (item.status === 'done' ? item.number : null));
  const inCooking = orders!.map((item) => (item.status === 'pending' ? item.number : null));

  const dispatch = useDispatch();
  useEffect(
      () => {
              dispatch({ type: WS_ORDERS_START, payload: 'orders/all' });
              return () => {
                setTimeout(() => dispatch({ type: WS_CONNECTION_CLOSED }),10000);
              }
      }, [dispatch]
  );

  return (
      <div className={styles.container}>
          <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
          <div className={styles.wrapper}>
              <div className={`p-2 ${styles.orders} ${styles.scrollbar}`}>
                  {orders!.map((item: IOrder, index: number) => (

                      <OrderCard key={index} item={item}/>
                  )
                  )}
              </div>
              <div className={`ml-15 ${styles.stats}`}>
                  <div className={` ${styles.workStat}`}>
                      <div className={`mr-9 ${styles.done}`}>
                          <h2 className='text text_type_main-medium'>Готовы:</h2>
                          <ul>
                              {readyOrder.slice(0, 5).map((item, index: number) => (
                                  <li key={index} className='text text_type_digits-default'>{item}</li>
                              ))}
                          </ul>
                      </div>
                      <div className={styles.inCooking}>
                          <h2 className='text text_type_main-medium'>В работе:</h2>
                          <ul>
                              {inCooking.slice(0, 5).map((item, index: number) => (
                                  <li key={index} className='text text_type_digits-default'>{item}</li>
                              ))}
                          </ul>
                      </div>
                  </div>
                  <div className={`mt-15 ${styles.allDone}`}>
                      <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                      <p className="text text_type_digits-large">{total}</p>
                  </div>
                  <div className={`mt-15 ${styles.todayDone}`}>
                      <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                      <p className="text text_type_digits-large">{totalToday}</p>
                  </div>
              </div>
          </div>
      </div>
  );
}