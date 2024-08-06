import type { Middleware, MiddlewareAPI } from 'redux';
import type { RootState, AppDispatch } from '../../components/utils/types';
import type { TWSActions } from '../actions/websocket';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;     
      const { type, payload, token } = action;
      


 //переписать на вызов заказов по отдельности.
      if (type === 'WS_ORDERS_START') {
            if (token === '' || token === undefined) {
              socket = new WebSocket(wsUrl + payload);
            } else {
              socket = new WebSocket(wsUrl + payload + '?token=' + token);
            }
       
      }
      
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch({ type: 'WS_GET_ORDERS', payload: data });
          } else {
            socket!.close();
          }

        };

        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }

        
        if(type === 'WS_CONNECTION_CLOSED'){
          socket.close()
        }
      }

      next(action);
    };
    }) as Middleware;
};