import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItem } from "../../redux/slices/cartSlice";
import styles from "./PizzaBlock.module.scss";
import { selectPizzaById } from "../../redux/slices/PizzasSlice.js";
import { selectCountByProductId } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { ICartItem } from "../../redux/slices/cartSlice";
import { useWhyDidYouUpdate } from "ahooks";

export const typesName = ["тонкое", "традиционное"];

export interface IPizzaBlock {
  id: number;
  productId: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  prices: number[];
}

interface IPizzaBlockProps {
  pizzaId: string | number;
}

interface IPizzaState {
  price?: number;
  type?: number;
  size?: number;
}

const PizzaBlock: React.FC<IPizzaBlockProps> = React.memo(({ pizzaId }) => {
  const data = useAppSelector((state) => selectPizzaById(state, pizzaId));
  const { id, productId, imageUrl, title, types, sizes, prices } =
    data as IPizzaBlock;

  const [pizzaState, setPizzaState] = React.useState<IPizzaState>({
    price: prices[0],
    type: types[0],
    size: sizes[0],
  });

  const dispatch = useAppDispatch();
  const count =
    useAppSelector((state) => selectCountByProductId(state, productId)) ?? 0;
  const items = useAppSelector((state) => state.cart.items);

  const handlePizzaState = (newPizzaState: IPizzaState) => {
    setPizzaState((prevPizzaState) => ({
      ...prevPizzaState,
      ...newPizzaState,
    }));
  };

  const onAddItem = () => {
    const pizzaType = pizzaState.type ?? types[0];
    const pizzaPrice = pizzaState.price ?? prices[0];
    const pizzaSize = pizzaState.size ?? sizes[0];

    const item: ICartItem = {
      id: items.length + 1,
      productId,
      title,
      imageUrl,
      price: pizzaPrice,
      type: typesName[pizzaType],
      size: pizzaSize,
    };

    dispatch(addItem(item));
  };
  return (
    <div className={styles.item}>
      <Link to={`pizza/${id}_${productId}`} state={{ pizzaState, productId }}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </Link>
      <Link to={`pizza/${id}_${productId}`} state={{ pizzaState, productId }}>
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <div className={styles.selector}>
        <ul>
          {types.map((typeIndex: number) => (
            <li
              key={typeIndex}
              className={pizzaState.type === typeIndex ? styles.active : ""}
              onClick={() => handlePizzaState({ type: typeIndex })}
            >
              {typesName[typeIndex]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, sizeIndex: number) => (
            <li
              key={size}
              className={pizzaState.size === size ? styles.active : ""}
              onClick={() => {
                handlePizzaState({
                  size: size,
                  price: prices[sizeIndex],
                });
              }}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>от {pizzaState.price} &#8372;</div>
        <div className="button button--outline button--add" onClick={onAddItem}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count ? <i>{count}</i> : ""}
        </div>
      </div>
    </div>
  );
});

export default PizzaBlock;
