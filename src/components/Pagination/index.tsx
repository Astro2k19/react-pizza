import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { setPage } from '../../redux/slices/filterSlice';

const Pagination = () => {
  const { pageCount } = useSelector((state) => state.pizzas);
  const page = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(page);

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const setNextPage = () => {
    setCurrentPage((prevState) =>
      prevState + 1 <= pageCount ? prevState + 1 : pageCount
    );
  };

  const setPrevPage = () => {
    setCurrentPage((prevState) => (prevState - 1 < 1 ? 1 : prevState - 1));
  };

  React.useEffect(() => {
    dispatch(setPage(currentPage));
  }, [currentPage]);

  const pagination = Array(pageCount)
    .fill()
    .map((_, index) => {
      const fixedIndex = index + 1;
      const isCurrent = currentPage === fixedIndex;

      return (
        <li
          key={fixedIndex}
          className={`${styles.item} ${isCurrent ? `${styles.active}` : ''}`}
          onClick={() => changeCurrentPage(fixedIndex)}
        >
          {fixedIndex}
        </li>
      );
    });

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.prev} ${styles.item}`}
        onClick={() => setPrevPage()}
      >
        &#171;
      </li>
      {pagination}
      <li
        className={`${styles.next} ${styles.item}`}
        onClick={() => setNextPage()}
      >
        &#187;
      </li>
    </ul>
  );
};

export default Pagination;
