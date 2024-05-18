import AppHeader from "../app-header/app-header.jsx";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
//import data from '../../data/data.json'

function App() {
  return (
    <>
      <div className={styles.page}>
        <AppHeader />
          <div className={styles.container}>
            <div className={styles.container_div_left}>
              <BurgerIngridients />
            </div>
            <div className={styles.container_div_right}>
              <BurgerConstructor />
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
