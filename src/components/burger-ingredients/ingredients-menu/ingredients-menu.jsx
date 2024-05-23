import IngredientCard from "../ingredient-card/ingredient-card";
import data from "../../../data/data.json";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import menuStyles from "./ingredients-menu.module.css";

export default function IngredientsMenu() {
  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <h2>Булки</h2>
          </div>
          <div className={menuStyles.items}>
            {data
              .filter((item) => item.type === "bun")
              .map((bun) => (
                <div className={menuStyles.item} key={bun._id}>
                  <Counter count={1} />
                  <div>
                    <img src={bun.image} alt={bun.name} />
                    <div>
                      <p className="text text_type_main-default pr-1 m-1 p-1">
                        {bun.price}
                        <CurrencyIcon type="primary" />
                      </p>
                    </div>
                    <div>
                      <p className="text text_type_main-default pr-1">
                        {bun.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div>
            <h2>Соусы</h2>
          </div>
          <div className={menuStyles.items}>
            {data
              .filter((item) => item.type === "sauce")
              .map((sauce) => (
                <div className={menuStyles.item} key={sauce._id}>
                  <Counter count={1} />
                  <div>
                    <img src={sauce.image} alt={sauce.name} />
                    <div>
                      <p className="text text_type_main-default pr-1 m-1 p-1">
                        {sauce.price}
                        <CurrencyIcon type="primary" />
                      </p>
                    </div>
                    <div>
                      <p className="text text_type_main-default pr-1">
                        {sauce.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div>
            <h2>Начинки</h2>
          </div>
          <div className={menuStyles.items}>
            {data
              .filter((item) => item.type === "main")
              .map((main) => (
                <div className={menuStyles.item} key={main._id}>
                  <Counter count={1} />
                  <div>
                    <img src={main.image} alt={main.name} />
                    <div>
                      <p className="text text_type_main-default pr-1 m-1 p-1">
                        {main.price}
                        <CurrencyIcon type="primary" />
                      </p>
                    </div>
                    <div>
                      <p className="text text_type_main-default pr-1">
                        {main.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

/*            <div>
                {buns.map((bun) => (
                    <IngridientCard item={bun}/> 
                ))}
            </div>
            <h2>Соусы</h2>
            <div> 
                {data.filter((item) => item.type === "sauce").map((sauce) => (
                    <IngridientCard item={sauce}/> 
                ))}           
            </div>
            <h2>Начинки</h2>
            <div>              
                {data.filter((item) => item.type === "main").map((main) => (
                    <IngridientCard item={main}/> 
                ))}
            </div>

        </div>
        </>
    );
}*/
