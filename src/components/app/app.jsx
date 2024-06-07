import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { getIngredients } from "../../services/actions/ingredients";

function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("запуск запроса");
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        {ingredientsRequest ? (
          <h2>Идет загрузка данных...</h2>
        ) : ingredientsFailed ? (
          <h2>Произошла ошибка</h2>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </div>
    </>
  );
}

export default App;
