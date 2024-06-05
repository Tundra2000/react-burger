import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { useEffect } from "react";
//import api from "../utils/api.jsx";
import { useDispatch } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getIngredientsData } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getIngredientsData()), [dispatch]);

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


  return (
    <>
      <AppHeader />
        <div className={styles.container}>
        <DndProvider backend = {HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider> 
        </div>

    </>
  );
}

export default App;
