import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { useEffect } from "react";
//import api from "../utils/api.jsx";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getIngredients } from "../../services/actions/ingredients";

function App() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector((state) => state.ingredients)

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("запуск запроса");
    if (!ingredients.length) dispatch(getIngredients())}, [dispatch, ingredients.length]);

  /*
  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const getData = async () => {
    try {
      setIngredients({ ...ingredients, hasError: false, isLoading: true });
      api
        .getIngredients()
        .then((data) =>
          setIngredients({ ...ingredients, data: data.data, isLoading: false })
        )
        .catch((e) => {
          console.log(e);
          setIngredients({ ...ingredients, hasError: true, isLoading: false });
        });
    } catch (err) {
      console.log(err);
      console.log(ingredients.data);
      console.log("Произошла ошибка : ", err.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const { data, isLoading, hasError } = ingredients;
*/

/*<BurgerConstructor />*/
  return (
    <>
      <AppHeader />
        <div className={styles.container}>
        {ingredientsRequest
          ? <h2>Идет загрузка данных...</h2>
          : ingredientsFailed
            ?
            <h2>Произошла ошибка</h2>
            :
            <DndProvider backend = {HTML5Backend}>
              <BurgerIngredients />
              
            </DndProvider> 
        }
        </div>

    </>
  );
}

export default App;
