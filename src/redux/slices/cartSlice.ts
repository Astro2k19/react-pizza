import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findCartItem } from "../../utils/utils";

const refreshPrice = (items: ICartItem[]): number =>
  items.reduce((sum, item) => (item.price ?? 1) * (item.count ?? 1) + sum, 0);

const refreshQuantity = (items: ICartItem[]): number =>
  items.reduce((sum, item) => (item.count ?? 0) + sum, 0);

export const selectCountByProductId = createSelector(
  [(state) => state.cart.items, (state, productId) => productId],
  (items, productId) =>
    items.reduce((sum: number, item: ICartItem) => {
      return item.productId === productId ? sum + (item.count ?? 0) : sum;
    }, 0)
);

export interface ICartItem {
  id?: number;
  productId: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count?: number;
}

interface ICartSliceState {
  totalPrice: number;
  totalQuantity: number;
  items: ICartItem[];
}

const loadFromLS = () => {
  const json = localStorage.getItem("cart");

  let data = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  };

  if (json) {
    data.items = JSON.parse(json);
    data.totalPrice = refreshPrice(data.items as ICartItem[]);
    data.totalQuantity = refreshQuantity(data.items as ICartItem[]);
  }

  return data;
};

export const initialState: ICartSliceState = {
  totalPrice: 0,
  totalQuantity: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const existingItem = findCartItem(state.items, action.payload);

      if (existingItem) {
        existingItem.count !== undefined ? existingItem.count++ : 0;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = refreshPrice(state.items);
      state.totalQuantity = refreshQuantity(state.items);
    },
    minusItem(state, action: PayloadAction<ICartItem>) {
      const item = findCartItem(state.items, action.payload);
      console.log(item);
      if (item) {
        item.count =
          item.count !== undefined
            ? item.count > 1
              ? (item.count -= 1)
              : 1
            : 0;
      }

      state.totalPrice = refreshPrice(state.items);
      state.totalQuantity = refreshQuantity(state.items);
    },
    removeItem(state, { payload }: PayloadAction<ICartItem>) {
      if (
        window.confirm("Are you really want to remove this product from cart?")
      ) {
        const allExceptRemoved = (item: ICartItem) => {
          return !(
            item.productId === payload.productId &&
            item.type === payload.type &&
            item.size === payload.size
          );
        };

        state.items = state.items.filter(allExceptRemoved);
        state.totalPrice = refreshPrice(state.items);
        state.totalQuantity = refreshQuantity(state.items);
      }
    },
    clearCart(state) {
      if (window.confirm("Are you really want to clear your cart?")) {
        state.items = [];
        state.totalPrice = 0;
        state.totalQuantity = 0;
      }
    },
  },
});

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
