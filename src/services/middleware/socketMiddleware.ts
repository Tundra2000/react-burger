import type { Middleware, MiddlewareAPI } from 'redux';
import type { RootState, AppDispatch } from '../../components/utils/types';
import type { TWSActions } from '../actions/websocket';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      //@ts-ignore
      const { type, payload, token } = action;


 
      if (type === 'WS_ORDERS_START') {
            // объект класса WebSocket
            if (token === '' || token === undefined) {
              socket = new WebSocket(wsUrl + payload);
            } else {
              socket = new WebSocket(wsUrl + payload + '?token=' + token);
            }
       
      }
      
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch({ type: 'WS_GET_ORDERS', payload: data });
          } else {
            socket!.close();
          }

        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }

        
        if(type === 'WS_CONNECTION_CLOSED'){
          socket.close(/*1000, 'user logged out'*/)
        }
      }

      next(action);
    };
    }) as Middleware;
};