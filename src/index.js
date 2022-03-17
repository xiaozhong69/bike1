import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import {Provider} from "react-redux";
import configStore from './redux/store';
// import Admin from './Admin';

const store = configStore();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
