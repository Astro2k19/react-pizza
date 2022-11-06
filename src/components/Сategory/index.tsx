import React from "react";
import styles from "./Category.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCategory, setPage } from "../../redux/slices/filterSlice";

interface ICategories {
  currentCategory: number;
}

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<ICategories> = React.memo(({ currentCategory }) => {
  const dispatch = useAppDispatch();

  const toggleCategory = (index: number) => {
    dispatch(setCategory(index));
    dispatch(setPage(1));
  };

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={currentCategory === index ? styles.active : ""}
            onClick={() => toggleCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
