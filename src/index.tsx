import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/app";
//import { store } from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { thunk } from "redux-thunk";
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from "./services/reducers/root-reducer";

import { socketMiddleware } from './services/middleware/socketMiddleware';
import { wsUrl } from "./components/utils/urls";

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;



const enhancer = composeEnhancers(applyMiddleware(thunk,  socketMiddleware(wsUrl)));

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
