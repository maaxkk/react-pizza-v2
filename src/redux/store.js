import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/filterSlice.js'

export const store = configureStore({
    reducer: {
        value: searchReducer
    },
})

console.log(store)