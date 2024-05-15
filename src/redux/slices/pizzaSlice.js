import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas =
    createAsyncThunk('pizza/fetchPizzas', async (params) => {
        const {currentPage, fullRequest} = params;
        const resp = await axios.get(`https://663b86b2fee6744a6ea1f725.mockapi.io/items?page=${currentPage}&limit=4&${fullRequest}`);
        return resp.data;
    })

export const initialState = {
    items: [],
    status: 'loading' // success || error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload.items;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase('pizza/fetchPizzas/pending', (state) => {
                console.log(fetchPizzas.pending.toString())
                state.items = [];
                state.status = 'loading';
            })
            .addCase('pizza/fetchPizzas/fulfilled', (state, action) => {
                state.items = action.payload
                state.status = 'success';
            })
            .addCase('pizza/fetchPizzas/rejected', (state) => {
                state.items = [];
                state.status = 'error';
            })
    }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer