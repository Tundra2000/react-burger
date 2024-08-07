import * as actions from '../actions/websocket';
import { TWSActions } from '../actions/websocket';
import * as reducer from './websocket';

const testFeed = {
    success: true,
    orders: [
        {
            _id:"64c8b8c382e277001bfa6122",
            ingredints: ["643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
            status:"done",
            name:"Люминесцентный краторный бургер",
            createdAt:"2023-08-01T07:48:19.378Z",
            updatedAt:"2023-08-01T07:48:19.538Z",
            number:15380,
        }
    ],
    total:20378,
    totalToday:79,
}

describe('Профиль', () => {
    it('Initial state', () => {
        const state = undefined;
        const action = {} as TWSActions;
        expect(reducer.websocketReducer(state, action)).toEqual(reducer.checkoutInitialState)
    })

    it('WS success', () => {
        const state = undefined;
        const action: TWSActions = {type: actions.WS_CONNECTION_SUCCESS};
        expect(reducer.websocketReducer(state, action)).toEqual({...reducer.checkoutInitialState, error: undefined, wsConnected: true})
    })

    it('WS error', () => {
        const state = undefined;
        const action: TWSActions = {type: actions.WS_CONNECTION_ERROR, payload: 'connection error' };
        expect(reducer.websocketReducer(state, action)).toEqual({...reducer.checkoutInitialState, error: 'connection error', wsConnected: false})
    })

    it('WS closed', () => {
        const state = undefined;
        const action: TWSActions = {type: actions.WS_CONNECTION_CLOSED};
        expect(reducer.websocketReducer(state, action)).toEqual({...reducer.checkoutInitialState, error: undefined, wsConnected: false})
    })

    it('WS feed', () => {
        const state = undefined;
        const action: TWSActions = {type: actions.WS_GET_ORDERS, payload: testFeed};
        expect(reducer.websocketReducer(state, action)).toEqual({...reducer.checkoutInitialState, error: undefined, orders: testFeed.orders, total: testFeed.total, totalToday: testFeed.totalToday})
    })

})