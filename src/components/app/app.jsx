import AppHeader from '../app-header/app-header.jsx';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';


function App() {
    return (
      <>
      <AppHeader />
      <div className={appStyles.wrapper}>
        <BurgerIngridients/>
        <BurgerConstructor/>
      </div>
      </>
    );
  }

  export default App;