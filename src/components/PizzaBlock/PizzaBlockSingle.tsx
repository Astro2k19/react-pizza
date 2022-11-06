import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./PizzaBlockSingle.module.scss";
import React from "react";
import { typesName } from "./index";
import {
  addItem,
  selectCountByProductId,
} from "../../redux/slices/cartSlice.js";
import { ICartItem } from "../../redux/slices/cartSlice.js";

interface IPizza {
  id?: string;
  productId?: string;
  category?: number;
  title?: string;
  imageUrl?: string;
  selectedPrice?: number;
  selectedType?: number;
  selectedSize?: number;
  rating?: number;
  prices?: number[];
  sizes?: number[];
  types?: number[];
}

const PizzaBlockSingle: React.FC = () => {
  const params = useParams();

  const [id = "", productId = ""] = params?.pizzaId?.split("_") || "";

  const [pizza, setPizza] = React.useState<IPizza>({});
  const [status, setStatus] = React.useState<string>("loading");
  const dispatch = useAppDispatch();

  const count: number =
    useAppSelector((state) => selectCountByProductId(state, productId)) ?? 0;
  const items = useAppSelector((state) => state.cart.items);

  React.useEffect(() => {
    const fetchPizzaById = async () => {
      try {
        const res = await fetch(
          `https://63471cba04a6d45757a0be78.mockapi.io/items/${id}`
        );
        const data = await res.json();

        handlePizzaState({
          ...data,
          selectedPrice: data.prices[0],
          selectedType: data.types[0],
          selectedSize: data.sizes[0],
        });

        setStatus("success");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };

    fetchPizzaById();
  }, []);

  const onAddItem = () => {
    const title = pizza.title || "";
    const imageUrl = pizza.imageUrl || "";
    const price = pizza.selectedPrice || 0;
    const type = pizza.selectedType ?? 0;
    const size = pizza.selectedSize ?? 0;

    const item: ICartItem = {
      id: items.length + 1,
      productId,
      title,
      imageUrl,
      price,
      type: typesName[type],
      size,
    };

    dispatch(addItem(item));
  };

  const handlePizzaState = (newPizzaState: IPizza) => {
    setPizza((prevPizzaState) => ({
      ...prevPizzaState,
      ...newPizzaState,
    }));
  };

  let content;

  switch (true) {
    case status === "loading":
      content = (
        <p style={{ textAlign: "center", fontSize: "25px", padding: "50px" }}>
          Loading...
        </p>
      );
      break;

    case status === "success":
      if (!pizza || !pizza.sizes || !pizza.types || !pizza.prices) {
        setStatus("error");
        return <></>;
      }

      const typeSelector = pizza.types.map((typeIndex) => (
        <li
          key={typeIndex}
          className={pizza.selectedType === typeIndex ? styles.active : ""}
          onClick={() => handlePizzaState({ selectedType: typeIndex })}
        >
          {typesName[typeIndex]}
        </li>
      ));

      const sizeSelector = pizza.sizes.map((size, sizeIndex) => (
        <li
          key={size}
          className={pizza.selectedSize === size ? styles.active : ""}
          onClick={() => {
            if (!pizza.prices) return;

            handlePizzaState({
              selectedSize: size,
              // NOTE THIS IS NOT GOOD
              selectedPrice: pizza.prices?.at(sizeIndex) ?? 0,
            });
          }}
        >
          {size} см.
        </li>
      ));

      content = (
        <div className={styles.item}>
          <div className={styles.inner}>
            <div className={styles.image}>
              <img src={pizza.imageUrl} alt={pizza.title} />
            </div>
            <div className={styles.content}>
              <div className={styles.itemTopContent}>
                <h3 className={styles.title}>{pizza.title}</h3>
                <div className={styles.price}>
                  от {pizza.selectedPrice} &#8372;
                </div>
              </div>
              <div className={styles.selector}>
                <ul>{typeSelector}</ul>
                <ul>{sizeSelector}</ul>
              </div>
              <div
                className="button button--outline button--add"
                onClick={onAddItem}
              >
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
        </div>
      );

      break;

    case status === "error" || !pizza:
      content = (
        <p style={{ textAlign: "center", fontSize: "25px", padding: "50px" }}>
          😔 Opps something happened...
        </p>
      );
      break;

    default:
      content = (
        <p style={{ textAlign: "center", fontSize: "25px", padding: "50px" }}>
          😔 Opps something happened...
        </p>
      );
  }

  return content;
};
export default PizzaBlockSingle;
