import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import qs from 'qs';


import Categories from "../components/Categories.jsx";
import Sort, {list} from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination/index.jsx";
import {initialState, setCurrentPage, setFilters} from "../redux/slices/filterSlice.js";
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzaSlice.js";

function Home() {
    // const {searchValue} = React.useContext(SearchContext)
    const params = useSelector((state) => state.filter)
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const dispatch = useDispatch();

    const {items, status} = useSelector(state => state.pizza)

    let pizzas = <h1>There is no pizzas 😔</h1>;
    if (items !== 'Not found') {
        pizzas = items.map(pizza => (
            <PizzaBlock key={pizza.id} {...pizza} />));
    }
    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index}/>
    ))

    async function getPizzas() {
        const categoryParam = params.category > 0 ? `category=${params.category}` : ''
        const search = params.search ? `search=${params.search}` : '';
        const fullRequest = `${categoryParam}&sortBy=${params.sort.value}&order=${params.order}&${search}`

        dispatch(fetchPizzas({
            currentPage: params.currentPage,
            fullRequest: fullRequest,
        }))
    }

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: params.sort.value,
                category: params.category,
                currentPage: params.currentPage,
                order: params.order,
            });
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [params])

    React.useEffect(() => {
        if (window.location.search) {
            const paramsQs = qs.parse(window.location.search.substring(1))
            if (
                initialState.category === Number(params.category) &&
                initialState.sort.value === paramsQs.sort &&
                initialState.currentPage === Number(paramsQs.currentPage)
            ) {
                getPizzas();
            }
            const sortObj = list.find(obj => obj.value === paramsQs.sort)
            dispatch(setFilters({
                currentPage: paramsQs.currentPage,
                order: paramsQs.order,
                category: paramsQs.category,
                sort: sortObj,
            }))
            isSearch.current = true;
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [params])

    function onChangePage(number) {
        dispatch(setCurrentPage(number))
    }

    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div className={'content__error-info'}>
                        <h2>Произошла ошибка 😕</h2>
                        <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                    </div> :
                    <div className="content__items">
                        {status === 'loading'
                            ? skeletons
                            : pizzas}
                    </div>
            }
            <Pagination value={params.currentPage} onChangePage={onChangePage}/>
        </div>
    );
}

export default Home;