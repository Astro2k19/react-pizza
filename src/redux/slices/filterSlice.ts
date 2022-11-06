import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum SortOrderEnum {
  ASC_ORDER = "asc",
  DESC_ORDER = "desc",
}

enum SortTypeEnum {
  RATING_TYPE = "rating",
  PRICE_TYPE = "price",
  TITLE_TYPE = "title",
}

export type SortType = {
  sortBy: SortTypeEnum;
  sortOrder: SortOrderEnum;
  value?: string;
};

export interface IFilterSliceState {
  searchValue?: string;
  currentPage: number;
  currentCategory: number;
  sort: SortType;
}

export const initialFilter: IFilterSliceState = {
  searchValue: "",
  currentPage: 1,
  currentCategory: 0,
  sort: {
    sortBy: SortTypeEnum.RATING_TYPE,
    sortOrder: SortOrderEnum.DESC_ORDER,
    value: "популярности",
  },
};

const filterSlice = createSlice({
  name: "filter",
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
      let changedOrder: SortOrderEnum;

      switch (state.sort.sortOrder) {
        case "desc":
          changedOrder = SortOrderEnum.ASC_ORDER;
          break;
        case "asc":
          changedOrder = SortOrderEnum.DESC_ORDER;
          break;
        default:
          changedOrder = SortOrderEnum.DESC_ORDER;
          break;
      }
      state.sort.sortOrder = changedOrder;
    },
    setAllFilters: {
      reducer(state, action: PayloadAction<IFilterSliceState>) {
        return action.payload;
      },
      prepare(params) {
        return {
          payload: {
            searchValue: params.searchValue,
            currentPage: Number(params.currentPage),
            currentCategory: Number(params.currentCategory),
            sort: {
              sortBy: params.sortBy,
              sortOrder: params.sortOrder,
              value: params.value,
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
