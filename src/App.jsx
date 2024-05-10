import React from "react";
import {Routes, Route} from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux";
// import {setSearchValue} from "./redux/slices/filterSlice.js";

import './scss/app.scss'
import Header from './components/Header.jsx'
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";

export const SearchContext = React.createContext();

function App() {
    // const [searchValue, setSearchValue] = React.useState('');

    // const searchValue = useSelector((state) => state.search.count);
    // const dispatch = useDispatch();

    // const pathname = window.location.pathname;
    return (
        <div className="wrapper">
            {/*<SearchContext.Provider value={{ searchValue, setSearchValue}}>*/}
                <Header/>
                <div className="content">
                    {/*{pathname === '/' && <Home/>}*/}
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            {/*</SearchContext.Provider>*/}
        </div>
    )
}

export default App
