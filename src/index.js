import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorBoundary from './Component/ErrorBoundary'
import { BrowserRouter as Router } from 'react-router-dom'
import 'typeface-roboto';
import { Provider } from 'react-redux';
import {enableMapSet} from 'immer'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer'
import * as serviceWorker from './serviceWorker';
enableMapSet()

const store = createStore(reducer, applyMiddleware(thunk));

const AppContainer = () => (
    <Provider store={store}>
        <Router>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </Router>
    </Provider>
);

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
