import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";

const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
