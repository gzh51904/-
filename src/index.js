import React from 'react';
import {
    render
} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//引入react-redux
import {Provider} from 'react-redux'
import store from './store'
// 引入路由模式 
import {
    HashRouter
} from 'react-router-dom'

render(
     //Provide组件必须在最外层
    <Provider store={store}>
    <HashRouter>
        <App/>
    </HashRouter>
    </Provider> ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();