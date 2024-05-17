import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {store} from "./redux/store.js";

const rootElem = document.getElementById('root');

if (rootElem) {
    ReactDOM.createRoot(rootElem).render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>

    )
}
