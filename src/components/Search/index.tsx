import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/clear.svg';
import { setSearch } from '../../redux/slices/filterSlice';

import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const delay = React.useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(event.target.value));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    delay(event);
  };

  const clearSearchInput = () => {
    setSearchValue('');
    dispatch(setSearch(''));
    inputRef.current?.focus();
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
