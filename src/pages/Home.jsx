import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from 'qs';


import Categories from "../components/Categories.jsx";
import Sort, {list} from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination/index.jsx";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice.js";
import {useNavigate, useSearchParams} from "react-router-dom";

function Home() {
    // const {searchValue} = React.useContext(SearchContext)
    const params = useSelector((state) => state.value)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

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
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sortObj = list.find(obj => obj.value === params.sort)
            console.log(sortObj)
            dispatch(setFilters({
                currentPage: params.currentPage,
                order: params.order,
                category: params.category,
                sort: sortObj,
            }))
        }
    }, [])

    React.useEffect(() => {
        setIsLoading(true)
        axios.get(`https://663b86b2fee6744a6ea1f725.mockapi.io/items?page=${params.currentPage}&limit=4&${fullRequest}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })

    }, [params])

    React.useEffect(() => {
       const queryString = qs.stringify({
           sort: params.sort.value,
           category: params.category,
           currentPage: params.currentPage,
           order: params.order,
       });
        navigate(`?${queryString}`)
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
            <div className="content__items">
                {!isLoading
                    ? pizzas
                    : skeletons}
            </div>
            <Pagination value={params.currentPage} onChangePage={onChangePage}/>
        </div>
    );
}

export default Home;