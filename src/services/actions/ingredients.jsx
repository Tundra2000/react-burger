import api from "../../components/utils/api.jsx";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_FAILED = "INGREDIENTS_FAILED";



/*
export const getIngredientsData = () => (dispatch) => {
    
        dispatch({
            type: INGREDIENTS_REQUEST
        });
        api
        .getIngredients()
        .then((response) =>
            {
            console.log(response);
            dispatch({
                type: INGREDIENTS_SUCCESS,
                data: response.data
            })
        }
        )
        .catch((err) => {
          console.log(err);
          dispatch({
            type: INGREDIENTS_ERROR,
        });
        });
    
}
*/


export function getIngredients() {
    return function(dispatch) {
      dispatch({
        type: INGREDIENTS_REQUEST
      });
      api.getIngredients().then(res => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: INGREDIENTS_FAILED
          });
        }
      });
    };
  }