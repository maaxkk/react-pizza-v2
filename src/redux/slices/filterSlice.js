import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    search: '',
    category: 0,
    order: 'desc',
    sort: {name: 'popularity', value: 'rating'},
    currentPage: 1,
}

export const filterSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.search = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setOrder: (state) => {
            state.order = state.order === 'desc' ? 'asc' : 'desc'
        },
        setSort: (state, action) => {
            state.sort.value = action.payload.value;
            state.sort.name = action.payload.name;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            console.log(action.payload)
            // state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.category = Number(action.payload.category);
            state.order = action.payload.order;
        }

    }
})

// console.log(filterSlice, 'slice')

export const {setFilters, setSearchValue, setCategory, setOrder, setSort, setCurrentPage} = filterSlice.actions

export default filterSlice.reducer