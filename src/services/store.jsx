
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers/root-reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


// Расширитель хранилища
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Инициализируем хранилище, использовав расширитель
export const store = createStore(rootReducer, enhancer); 