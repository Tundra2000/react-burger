import { useRef } from "react";
import ingredientStyles from "./ingredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import {
  DEL_FROM_CONSTRUCTOR,
  MOVE_IN_CONSTRUCTOR,
} from "../../../services/actions/constructor";
import { XYCoord } from 'dnd-core';
import { IConstructorIngredient } from "../../utils/types";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export type ConstructorElementType = "top" | "bottom" | undefined;

interface IIngredient {
  id: string;
  item: IConstructorIngredient;
  index: number;
  type?: string;
}

function Ingredient ({ id, item, index, type }:IIngredient) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  //Попадание элемента в контейнер
  const [{ handlerId }, drop] = useDrop({
    accept: "sort",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = (item as DragItem).index;
      const dropIndex = index;

      if (dragIndex === dropIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: MOVE_IN_CONSTRUCTOR,
        payload: {
          from: dragIndex,
          to: dropIndex,
        },
      });
      (item as DragItem).index = dropIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "sort",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClose = () => {
    dispatch({
      type: DEL_FROM_CONSTRUCTOR,
      index: index,
      id: id,
    });
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      className={ingredientStyles.list_item}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}
    >
      <div className={ingredientStyles.item_container}>
        <DragIcon type="primary" />
        <ConstructorElement
          type={type as ConstructorElementType}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={handleClose}
        />
      </div>
    </li>
  );
};

export default Ingredient;