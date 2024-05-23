import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import React from "react";
const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const getData = async () => {
    try {
      setState({ ...state, hasError: false, isLoading: true });
      await fetch(dataUrl)
        .then((res) => res.json())
        .then((data) => setState({ ...state, data: data.data, isLoading: false }))
        .catch((e) => {
          console.log(e);
          setState({ ...state, hasError: true, isLoading: false });
        });
    } catch (err) {
      console.log(err);
      console.log(state.data);
      console.log("Произошла ошибка : ", err.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const { data, isLoading, hasError } = state;

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
