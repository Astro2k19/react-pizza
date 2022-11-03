import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ sort, currentCategory, currentPage, searchValue }) => {
    const category = currentCategory > 0 ? `category=${currentCategory}&` : '';
    const searchText = searchValue ? `search=${searchValue}&` : '';

    const url = 'https://63471cba04a6d45757a0be78.mockapi.io/items';
    const queryStr = `?page=${currentPage}&limit=4&${searchText}${category}sortBy=${sort.sortBy}&order=${sort.sortOrder}`;

    const response = await fetch(`${url}${queryStr}`);

    return await response.json();
  }
);


const pizzasAdapter = createEntityAdapter();

const initialState = pizzasAdapter.getInitialState({
    pageCount: 0,
    status: 'pending',
})

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        const pagesCount = Math.ceil(10 / 4); // backend should return general count of pizzas so that we can calculate

        pizzasAdapter.upsertMany(state, action.payload)
        state.pageCount = pagesCount;
        state.status = 'fulfilled';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
          pizzasAdapter.removeAll(state);
      });
  },
});

export const {selectById : selectPizzaById, selectIds: selectPizzasIds} = pizzasAdapter.getSelectors(state => state.pizzas)

export default pizzasSlice.reducer;
