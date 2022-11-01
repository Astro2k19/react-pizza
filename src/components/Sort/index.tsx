import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy, setFilterOrder } from '../../redux/slices/filterSlice';
import styles from './Sort.module.scss';

export const sortOrderList = [
  { value: 'популярности', sortBy: 'rating' },
  { value: 'цене', sortBy: 'price' },
  { value: 'алфавиту', sortBy: 'title' },
];

export default function Sort() {
  const [isOpen, setIsOpen] = React.useState(true);
  const dispatch = useDispatch();
  const sortRef = React.useRef();

  const { value, sortOrder, sortBy } = useSelector(
    (state) => state.filter.sort
  );

  React.useEffect(() => {
    const closeSort = ({ target }) => {
      if (sortRef.current && !sortRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeSort);

    return () => {
      document.removeEventListener('click', closeSort);
    };
  }, [sortRef]);

  return (
    <div className={`${styles.sort}`} ref={sortRef}>
      <div className={styles.label}>
        <button
          className={`${styles.sortDirection} ${sortOrder}`}
          onClick={() => dispatch(setFilterOrder())}
          title={
            sortOrder ? 'Сортировка по возрастанию' : 'Сортировка по убыванию'
          }
        >
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            />
          </svg>
        </button>
        <b>Сортировка по:</b>
        <span
          onClick={(e) => {
            setIsOpen((prevIsOpen) => !prevIsOpen);
          }}
        >
          {value}
        </span>
      </div>
      {isOpen && (
        <div className={`${styles.popup} ${isOpen && 'open'}`}>
          <ul>
            {sortOrderList.map((item) => (
              <li
                key={item.sortBy}
                className={sortBy === item.sortBy ? styles.active : ''}
                onClick={() => {
                  setIsOpen(false);
                  dispatch(setSortBy(item));
                }}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
