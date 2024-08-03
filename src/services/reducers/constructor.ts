import {
  ADD_TO_CONSTRUCTOR,
  DEL_FROM_CONSTRUCTOR,
  MOVE_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from "../actions/constructor";
import { IIngredient } from "../../components/utils/types";
import { TConstructorActions } from "../actions/constructor";


export type TBurgerConstructorState = {
  bun: IIngredient | null;
  filling: IIngredient[];
  counts: any;
};

// список всех ингредиентов в текущем конструкторе бургера,
const burgerConstructorInitialState: TBurgerConstructorState = {
  filling: [],
  bun: null,
  counts: {},
};

export const constructorReducer = (
  state = burgerConstructorInitialState,
  action: TConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_TO_CONSTRUCTOR: {
      if (action.item.type === "bun") {
        return {
          ...state,
          bun: action.item,
        };
      } else {
        return {
          ...state,
          filling: [...state.filling, action.item],
          counts: {
            ...state.counts,
            [action.item._id]: (state.counts[action.item._id] || 0) + 1,
          },
        };
      }
    }
    case DEL_FROM_CONSTRUCTOR: {
      return {
        ...state,
        filling: [...state.filling].filter(
          (item, index) => index !== action.index
        ),
        counts: {
          ...state.counts,
          [action.id]: state.counts[action.id] - 1,
        },
      };
    }
    case MOVE_IN_CONSTRUCTOR: {
      const newArray = [...state.filling];
      const hoverItem = newArray.splice(action.payload.from, 1)[0];
      newArray.splice(action.payload.to, 0, hoverItem);
      return {
        ...state,
        filling: newArray,
      };
    }
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        filling: [],
        bun: null,
        counts: {},
      };
    default: {
      return state;
    }
  }
};
