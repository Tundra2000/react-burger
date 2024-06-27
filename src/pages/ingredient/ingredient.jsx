import  IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';


//ingredients/:id — страница ингредиента. 
export function IngredientPage() {
    return (
        <div className={styles.content}>
            <h2 className="text text_type_main-large mb-6">Детали ингредиента</h2>
            <IngredientDetails />
        </div>
    );
};