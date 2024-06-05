import api from "../../components/utils/api.jsx";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "BURGER_INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "BURGER_INGREDIENTS_ERROR";




export function getIngredientsData() {
    return function (dispatch) {
        dispatch({
            type: INGREDIENTS_REQUEST
        });
        api
        .getIngredients()
        .then((data) =>
            dispatch({
                type: INGREDIENTS_SUCCESS,
                data: data.data
            })
        )
        .catch((err) => {
          console.log(err);
          dispatch({
            type: INGREDIENTS_ERROR,
        });
        });


    }
}