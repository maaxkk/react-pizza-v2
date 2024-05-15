import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice.js'
import cartReducer from './slices/cartSlice.js'
import pizzaReducer from './slices/pizzaSlice.js';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizza: pizzaReducer,
    },
})
