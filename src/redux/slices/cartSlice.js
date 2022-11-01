import {createSelector, createSlice} from '@reduxjs/toolkit';
import {findCartItem} from '../../utils/utils';

const refreshPrice = (items) =>
    items.reduce((sum, item) => item.price * item.count + sum, 0);

const refreshQuantity = (items) =>
    items.reduce((sum, item) => item.count + sum, 0);

export const selectCountByProductId = createSelector(
    [(state) => state.cart.items, (state, productId) => productId],
    (items, productId) => items.reduce((sum, item) => {
        return item.productId === productId ? sum + item.count : sum;
    }, 0));

export const initialState = {
    totalPrice: 0,
    totalQuantity: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const existingItem = findCartItem(state.items, action.payload);

            if (existingItem) {
                existingItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = refreshPrice(state.items);
            state.totalQuantity = refreshQuantity(state.items);
        },
        minusItem(state, action) {
            const item = findCartItem(state.items, action.payload);
            item.count = item.count > 1 ? (item.count -= 1) : 1;

            state.totalPrice = refreshPrice(state.items);
            state.totalQuantity = refreshQuantity(state.items);
        },
        removeItem(state, {payload}) {
            if (
                window.confirm('Are you really want to remove this product from cart?')
            ) {
                const allExceptRemoved = (item) => {
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
            if (window.confirm('Are you really want to clear your cart?')) {
                state.items = [];
                state.totalPrice = 0;
                state.totalQuantity = 0;
            }
        },
    },
});

export const {addItem, minusItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
