import * as actions from '../actions/ingredient-detail';
import { TDetailIngredientActions } from '../actions/ingredient-detail';
import * as reducer from './ingredient-detail';

const testIngredient = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
}

describe('Модальное окно ингредиента', () => {

    it('Initial state', () => {
        const state = undefined;
        const action = {} as TDetailIngredientActions;
        expect(reducer.ingredientDetail(state, action)).toEqual(reducer.ingredientDetailState)
    })

    it('SET_DETAIL_INGREDIENT', () => {
        const state = { ...reducer.ingredientDetailState };
        const action: TDetailIngredientActions = { type: actions.SET_DETAIL_INGREDIENT, ingredient: testIngredient };
        expect(reducer.ingredientDetail(state, action)).toEqual({...reducer.ingredientDetailState, ingredient: testIngredient})
    })

    it('CLEAR_DETAIL_INGREDIENT', () => {
        const state = { ...reducer.ingredientDetailState };
        const action: TDetailIngredientActions = { type: actions.CLEAR_DETAIL_INGREDIENT };
        expect(reducer.ingredientDetail(state, action)).toEqual({...reducer.ingredientDetailState, ingredient: {}})
    })
})