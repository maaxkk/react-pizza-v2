import React from "react";

function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(5);

    const categories = ['All', 'Meat', 'Vegan', 'Grille', 'Spicy', 'Closed']

    function onClickCategory(index) {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => onClickCategory(index)} className={index === activeIndex ? 'active' : ''}>{category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories