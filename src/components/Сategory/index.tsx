import React from 'react';
import styles from './Category.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setPage } from '../../redux/slices/filterSlice';
import {createSelector} from "@reduxjs/toolkit";

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

 const Categories: React.FC = () => {
  const { currentCategory } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

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
            className={currentCategory === index ? styles.active : ''}
            onClick={() => toggleCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories
