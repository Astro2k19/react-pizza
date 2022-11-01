import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/clear.svg';
import { setSearch } from '../../redux/slices/filterSlice';

import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const inputRef = React.useRef();

  const delay = React.useCallback(
    debounce((event) => {
      dispatch(setSearch(event.target.value));
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
    delay(event);
  };

  const clearSearchInput = () => {
    setSearchValue('');
    dispatch(setSearch(''));
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.searchIcon} alt='search icon' />
      <input
        type='text'
        name='search'
        ref={inputRef}
        value={searchValue}
        className={styles.search}
        onChange={onChangeInput}
      />
      {searchValue && (
        <img
          src={clearIcon}
          className={styles.clearIcon}
          alt='clear icon'
          onClick={clearSearchInput}
        />
      )}
    </div>
  );
};

export default Search;
