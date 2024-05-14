import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1})
            }
            state.totalPrice = state.items.reduce((acc, curr) => acc + (curr.price * curr.count), 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

// console.log(filterSlice, 'slice')

export const {minusItem, addItem, removeItem, clearItems} = cartSlice.actions

export default cartSlice.reducer