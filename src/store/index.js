import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const Middleware = [thunk];

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...Middleware)));

export default store;