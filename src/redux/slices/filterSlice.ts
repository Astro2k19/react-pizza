import { createSlice, current } from '@reduxjs/toolkit';
import { sortOrderList } from '../../components/Sort/index';

export const initialFilter = {
  searchValue: '',
  currentPage: 1,
  currentCategory: 0,
  sort: {
    sortBy: 'rating',
    sortOrder: 'desc',
  },
};

Object.defineProperty(initialFilter.sort, 'value', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: 'популярности',
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setCategory(state, action) {
      state.currentCategory = action.payload;
    },
    setSortBy(state, { payload }) {
      state.sort.value = payload.value;
      state.sort.sortBy = payload.sortBy;
    },
    setFilterOrder(state) {
      let changedOrder;

      switch (state.sort.sortOrder) {
        case 'desc':
          changedOrder = 'asc';
          break;
        case 'asc':
          changedOrder = 'desc';
          break;
        default:
          changedOrder = 'desc';
          break;
      }
      state.sort.sortOrder = changedOrder;
    },
    setAllFilters: {
      reducer(state, { payload }) {
        state.sort = payload.sort;
        state.currentCategory = payload.currentCategory;
      },
      prepare(params) {
        const value = sortOrderList.find(
          (item) => item.sortBy === params.sortBy
        ).value;

        return {
          payload: {
            currentPage: Number(params.currentPage),
            currentCategory: Number(params.currentCategory),
            sort: {
              sortBy: params.sortBy,
              sortOrder: params.sortOrder,
              value,
            },
          },
        };
      },
    },
    setSearch(state, { payload }) {
      state.searchValue = payload;
    },
  },
});

export const {
  setCategory,
  setSortBy,
  setFilterOrder,
  setAllFilters,
  setSearch,
  setPage,
} = filterSlice.actions;
export default filterSlice.reducer;
