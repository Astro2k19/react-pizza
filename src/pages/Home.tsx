import React from 'react';
import Categories from '../components/Сategory/index.js';
import Sort from '../components/Sort/index.js';
import PizzaBlock from '../components/PizzaBlock/index.js';
import Skeleton from '../components/PizzaBlock/Skeleton';
import styles from '../App.module.scss';
import Pagination from '../components/Pagination/index.js';

import {useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas, selectPizzasIds } from '../redux/slices/PizzasSlice';
import QueryString from 'qs';
import { setAllFilters } from '../redux/slices/filterSlice';
import { checkQueryParams } from '../utils/utils';
import Error from '../components/Error.js';

const Home = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const itemsIds = useSelector(selectPizzasIds);
  const {status} = useSelector(state => state.pizzas)

  const { currentCategory, searchValue, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const navigator = useNavigate();

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        currentPage,
        currentCategory,
        sortBy: sort.sortBy,
        sortOrder: sort.sortOrder,
      });

      navigator(`?${queryString}`);
    }

    isMounted.current = true;
  }, [currentCategory, sort, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.slice(1));

      const readyQueryParams = checkQueryParams(params);
      dispatch(setAllFilters(readyQueryParams));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchPizzas({ sort, currentCategory, currentPage, searchValue })
      );
    }

    isSearch.current = false;
  }, [currentCategory, sort, searchValue, currentPage]);

  const skeleton = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = itemsIds.map((pizzaId) => <PizzaBlock key={pizzaId} pizzaId={pizzaId} />);

  return (
    <div className={styles.content}>
      <div className='container'>
        <div className={styles.topBar}>
          <Categories />
          <Sort />
        </div>
        <h2 className={styles.title}>Все пиццы</h2>
        {status === 'error' ? (
          <Error />
        ) : (
          <div className={styles.items}>
            {status === 'pending' ? skeleton : pizzas}
          </div>
        )}
        <Pagination active={currentPage} pageRangeDisplay={4} />
      </div>
    </div>
  );
};

export default Home;
