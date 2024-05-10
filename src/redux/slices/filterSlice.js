import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
            state.sort.value = action.payload.sort;
            state.sort.name = action.payload.name;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }

    }
})

console.log(filterSlice, 'slice')

export const {setSearchValue, setCategory, setOrder, setSort, setCurrentPage} = filterSlice.actions

export default filterSlice.reducer