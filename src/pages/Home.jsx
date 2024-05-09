import React from 'react';
import ReactPaginate from "react-paginate";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination/index.jsx";
import {SearchContext} from "../App.jsx";

function Home() {
    const {searchValue} = React.useContext(SearchContext)

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [queryParams, setQueryParams] = React.useState({
        sort: {name: 'popularity', sortType: 'rating'},
        category: 0,
        order: 'desc',
    });
    const [currentPage, setCurrentPage] = React.useState(1);

    const pizzas = items.map(pizza => (<PizzaBlock key={pizza.id} {...pizza} />));
    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index}/>
    ))

    const category = queryParams.category > 0 ? `category=${queryParams.category}` : ''
    const search = searchValue ? `search=${searchValue}` : '';
    const fullRequest = `${category}&sortBy=${queryParams.sort.sortType}&order=${queryParams.order}&${search}`

    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://663b86b2fee6744a6ea1f725.mockapi.io/items?page=${currentPage}&limit=4&${fullRequest}`)
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
                window.scrollTo(0, 0)
            })
    }, [queryParams, searchValue, currentPage])

    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories queryParams={queryParams} setQueryParams={(index) =>
                    setQueryParams(prevParams => ({...prevParams, category: index}))}/>
                <Sort queryParams={queryParams} setQueryParams={setQueryParams}/>
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