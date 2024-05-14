import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/slices/filterSlice.js";

function Categories() {
    const categories = ['All', 'Meat', 'Vegan', 'Grille', 'Spicy', 'Closed']
    const categoryParam = useSelector((state) => state.filter.category)
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => dispatch(setCategory(index))} className={index === categoryParam ? 'active' : ''}>{category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories