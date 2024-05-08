import './scss/app.scss'
import Header from './components/Header.jsx'
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";
import React from "react";

function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('https://663b86b2fee6744a6ea1f725.mockapi.io/items#')
            .then(res => res.json())
            .then(json => setItems(json))
    }, [])
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        {/*<Categories/>*/}
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items.map(pizza => (
                                <PizzaBlock {...pizza}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
