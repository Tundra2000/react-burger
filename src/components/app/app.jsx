import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import React from "react";
import api from "../utils/api.jsx";

function App() {
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

  return (
    <>
      <AppHeader />
      {isLoading && <p>"Загрузка..."</p>}
      {hasError && <p>"Произошла ошибка"</p>}
      {!isLoading && !hasError && data.length && (
        <div className={styles.container}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </div>
      )}
    </>
  );
}

export default App;
