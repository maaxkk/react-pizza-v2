import React from "react";
import {Route, Routes} from "react-router-dom";

import './scss/app.scss'
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";
import FullPizza from "./pages/FullPizza.js";
import MainLayout from "./layout/MainLayout.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/pizza/:id'} element={<FullPizza/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
