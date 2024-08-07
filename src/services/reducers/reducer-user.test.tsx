import * as actions from '../actions/user';
import { TUserActions } from '../actions/user';
import * as reducer from './user';


describe('Профиль', () => {

    it('Initial state', () => {
        const state = undefined;
        const action = {} as TUserActions;
        expect(reducer.userReducer(state, action)).toEqual(reducer.userInitialState)
    })

    it('User request', () => {
        const state = undefined;
        const action: TUserActions = { type: actions.GET_USER_REQUEST };

        expect(reducer.userReducer(state, action)).toEqual({ ...reducer.userInitialState, isLoading: true })
    })

    it('User success', () => {
        const state = undefined;
        const action: TUserActions = { type: actions.GET_USER_SUCCESS, user: { email: 'test@test.ru', name: 'test' } };
        expect(reducer.userReducer(state, action)).toEqual({ ...reducer.userInitialState, isUserAuth: true, user: { email: 'test@test.ru', name: 'test'} })
    })

    it('User reset success', () => {
        const state = undefined;
        const action: TUserActions = { type: actions.GET_RESET_SUCCESS};
        expect(reducer.userReducer(state, action)).toEqual({...reducer.userInitialState, isUserAuth: true})
    })

    it('User logout success', () => {
        const state = undefined;
        const action: TUserActions = { type: actions.GET_LOGOUT_SUCCESS};
        expect(reducer.userReducer(state, action)).toEqual(reducer.userInitialState)
    })

    it('User user failed', () => {
        const state = undefined;
        const action: TUserActions = { type: actions.GET_USER_FAILED, message: 'Auth error'};
        expect(reducer.userReducer(state, action)).toEqual({...reducer.userInitialState, requestError: 'Auth error'})
    })

})