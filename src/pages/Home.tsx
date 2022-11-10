import React from "react";
import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  Pagination,
  Error,
} from "../components";
import styles from "../App.module.scss";

import { useNavigate } from "react-router-dom";
import {
  fetchPizzas,
  selectPizzasIds,
  StatusEnum,
} from "../redux/slices/PizzasSlice";
import QueryString from "qs";
import { setAllFilters } from "../redux/slices/filterSlice";
import { checkQueryParams } from "../utils/utils";
import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Home = () => {
  const isSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  const itemsIds: EntityId[] = useAppSelector(selectPizzasIds);
  const { status, pageCount } = useAppSelector((state) => state.pizzas);

  const { currentCategory, searchValue, sort, currentPage } = useAppSelector(
    (state) => state.filter
  );
  //Add "AppDispatch" because
  // https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
  const dispatch = useAppDispatch();
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
  const pizzas = itemsIds.map((pizzaId) => (
    <PizzaBlock key={pizzaId} pizzaId={pizzaId} />
  ));

  return (
    <div className={styles.content}>
      <div className="container">
        <div className={styles.topBar}>
          <Categories currentCategory={currentCategory} />
          <Sort {...sort} />
        </div>
        <h2 className={styles.title}>Все пиццы</h2>
        {status === StatusEnum.ERROR ? (
          <Error />
        ) : (
          <div className={styles.items}>
            {status === StatusEnum.PENDING ? skeleton : pizzas}
          </div>
        )}
        {status === StatusEnum.FULLFILLED && (
          <Pagination pageCount={pageCount} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
};

export default Home;
