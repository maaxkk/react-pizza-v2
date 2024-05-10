import React from 'react';
import ReactPaginate from "react-paginate";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination/index.jsx";
import {SearchContext} from "../App.jsx";
import {useDispatch, useSelector} from "react-redux";

function Home() {
    // const {searchValue} = React.useContext(SearchContext)
    const params = useSelector((state) => state.value)
    const dispatch = useDispatch();

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    // const [queryParams, setQueryParams] = React.useState({
    //     sort: {name: 'popularity', sortType: 'rating'},
    //     category: 0,
    //     order: 'desc',
    // });
    const [currentPage, setCurrentPage] = React.useState(1);

    let pizzas = <h1>There is no pizzas 😔</h1>;
    if (items !== 'Not found') {
        pizzas = items.map(pizza => (<PizzaBlock key={pizza.id} {...pizza} />));
    }
    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index}/>
    ))

    const categoryParam = params.category > 0 ? `category=${params.category}` : ''
    const search = params.search ? `search=${params.search}` : '';
    const fullRequest = `${categoryParam}&sortBy=${params.sort.value}&order=${params.order}&${search}`

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://663b86b2fee6744a6ea1f725.mockapi.io/items?page=${currentPage}&limit=4&${fullRequest}`)
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
                window.scrollTo(0, 0)
            })
    }, [params, currentPage])

    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {!isLoading
                    ? pizzas
                    : skeletons}
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </div>
    );
}

export default Home;