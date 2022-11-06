import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IFilterSliceState } from "./filterSlice";
import { IPizzaBlock } from "../../components/PizzaBlock";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk<IPizzaBlock[], IFilterSliceState>(
  "pizzas/fetchPizzas",
  async ({ sort, currentCategory, currentPage, searchValue }) => {
    const category = currentCategory > 0 ? `category=${currentCategory}&` : "";
    const searchText = searchValue ? `search=${searchValue}&` : "";

    const url = "https://63471cba04a6d45757a0be78.mockapi.io/items";
    const queryStr = `?page=${currentPage}&limit=4&${searchText}${category}sortBy=${sort.sortBy}&order=${sort.sortOrder}`;

    const response = await fetch(`${url}${queryStr}`);

    return await response.json();
  }
);

export enum StatusEnum {
  PENDING = "pending",
  FULLFILLED = "fulfilled",
  ERROR = "error",
}

const pizzasAdapter = createEntityAdapter<IPizzaBlock>();

const initialState = pizzasAdapter.getInitialState({
  pageCount: 0,
  status: StatusEnum.PENDING,
});

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = StatusEnum.PENDING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        const pagesCount: number = Math.ceil(10 / 4); // backend should return general count of pizzas so that we can calculate

        pizzasAdapter.setAll(state, action.payload);
        state.pageCount = pagesCount;
        state.status = StatusEnum.FULLFILLED;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = StatusEnum.ERROR;
        pizzasAdapter.removeAll(state);
      });
  },
});

export const { selectById: selectPizzaById, selectIds: selectPizzasIds } =
  pizzasAdapter.getSelectors((state: RootState) => state.pizzas);

export default pizzasSlice.reducer;
