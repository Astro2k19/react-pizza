import styles from "./Pagination.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as React from "react";
import { setPage } from "../../redux/slices/filterSlice";

interface IPaginationProps {
  pageCount: number;
  currentPage: number;
}

export const Pagination: React.FC<IPaginationProps> = React.memo(
  ({ pageCount, currentPage }) => {
    const dispatch = useAppDispatch();

    console.log("re-render");

    const changeCurrentPage = (page: number) => {
      dispatch(setPage(page));
    };

    const setNextPage = () => {
      dispatch(
        setPage(currentPage + 1 <= pageCount ? currentPage + 1 : pageCount)
      );
    };

    const setPrevPage = () => {
      dispatch(setPage(currentPage - 1 < 1 ? 1 : currentPage - 1));
    };

    React.useEffect(() => {
      dispatch(setPage(currentPage));
    }, [currentPage]);

    const pagination = Array(pageCount)
      .fill(undefined)
      .map((_, index) => {
        const fixedIndex = index + 1;
        const isCurrent = currentPage === fixedIndex;

        return (
          <li
            key={fixedIndex}
            className={`${styles.item} ${isCurrent ? `${styles.active}` : ""}`}
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
  }
);
