import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngridientCard({ item }) {
  return (
    <>
      <div>
        <Counter count={1} />
        <div>
          <img src={item.image} alt={item.name} />
          <div>
            <p className="text text_type_main-default pr-1 m-1 p-1">
              {item.price}
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <div>
            <p className="text text_type_main-default pr-1">{item.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
