import React from "react";

function Categories({queryParams ,setQueryParams}) {
    const categories = ['All', 'Meat', 'Vegan', 'Grille', 'Spicy', 'Closed']

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => setQueryParams(index)} className={index === queryParams.category ? 'active' : ''}>{category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories