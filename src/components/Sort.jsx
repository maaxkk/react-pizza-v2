import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setOrder, setSort} from "../redux/slices/filterSlice.js";

function Sort() {
    const [open, setOpen] = React.useState(false);

    const params = useSelector((state) => state.value)
    const dispatch = useDispatch()

    const list = [
        {name:'popularity', sort: 'rating'},
        {name:'price', sort: 'price'},
        {name: 'alphabetically', sort: 'title'}]

    function onClickListItem(listObj) {
        // setQueryParams(prevParams => {
        //     return {...prevParams, sort: selectedSortName}
        // })
        // setQueryParams(prevParams => {
        //     let nextSort = {...prevParams.sort};
        //     nextSort.sortType = listObj.sort;
        //     nextSort.name =  listObj.name;
        //     console.log(nextSort)
        //     return {...prevParams, sort: nextSort}
        // });
        dispatch(setSort(listObj))
        setOpen(false);
    }

    function onClickOrderHandle() {
        // setQueryParams(prevParams => {
        //     let nextParams = {...prevParams}
        //     if (nextParams.order === 'desc') nextParams.order = 'asc'
        //     else nextParams.order = 'desc'
        //     return nextParams;
        // })
        dispatch(setOrder())
    }

    return (
        <div className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={() => setOpen(!open)}>{params.sort.name}</span>
            </div>
            <button onClick={() => onClickOrderHandle()} className={'sort__order'}>
                {params.order === 'desc' ? '↑' : '↓'}
            </button>
            {
                open &&
                <div className="sort__popup">
                    <ul>
                        {
                            list.map((obj, index) => (
                                <li
                                    key={obj.sort}
                                    className={params.sort.value === obj.sort ? 'active' : ''}
                                    onClick={() => onClickListItem(obj)}
                                >{obj.name}</li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}


export default Sort