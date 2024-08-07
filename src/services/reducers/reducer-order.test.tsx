import * as actions from '../actions/order'
import { TOrderActions } from '../actions/order';
import * as reducer from './order'

const testOrderNumber = 20752;

const testOrder = {
    _id:"6504d6216d2997001caa8fef",
    ingredients: [ "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093d"],
    status:"done",
    name:"Био-марсианский люминесцентный флюоресцентный бургер",
    createdAt:"2023-09-15T22:09:37.751Z",
    updatedAt:"2023-09-15T22:09:37.963Z",
    number:20752
}

const nullOrder = {
    _id: "",
    ingredients: [],
    status: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    number: 0
  }

describe('Заказ', () => {
    it('Initial state', () => {
        const state = undefined;
        const action = {} as TOrderActions;
        expect(reducer.orderReducer(state, action)).toEqual(reducer.checkoutInitialState)
    })

    it('Order request', () => {
        const state = undefined;
        const action: TOrderActions = {type: actions.POST_ORDER_REQUEST};
        expect(reducer.orderReducer(state, action)).toEqual({...reducer.checkoutInitialState, orderRequest: true, orderFailed: false, order: 0})
    })

    it('Order success', () => {
        const state = undefined;
        const action: TOrderActions = {type: actions.POST_ORDER_SUCCESS, data: testOrderNumber};
        expect(reducer.orderReducer(state, action)).toEqual({...reducer.checkoutInitialState, orderRequest: false, orderFailed: false, order: testOrderNumber})
    })

    it('Order failed', () => {
        const state = undefined;
        const action: TOrderActions = {type: actions.POST_ORDER_FAILED};
        expect(reducer.orderReducer(state, action)).toEqual({...reducer.checkoutInitialState, orderRequest: false, orderFailed: true, order: 0})
    })

    it('Order detail', () => {
        const state = undefined;
        const action: TOrderActions = {type: actions.ORDER_DETAIL, data: testOrder};
        expect(reducer.orderReducer(state, action)).toEqual({...reducer.checkoutInitialState, orderDetail: testOrder})
    })

    it('Order modal open', () => {
        const state = undefined;
        const action: TOrderActions = {type: actions.ORDER_MODAL_OPEN, data: testOrder};
        expect(reducer.orderReducer(state, action)).toEqual({...reducer.checkoutInitialState, orderDetail: testOrder, isVisible: true})
    })
    
    it('Order modal close', () => {
        const state = undefined;
        const action: TOrderActions = {type: actions.ORDER_MODAL_CLOSE};
        expect(reducer.orderReducer(state, action)).toEqual({...reducer.checkoutInitialState, orderDetail: nullOrder, order: 0})
    })
})