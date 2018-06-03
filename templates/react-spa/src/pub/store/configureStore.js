
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function (preloadState, middleware = [thunk]) {
    const store = createStore(reducer, preloadState, composeEnhancers(
        applyMiddleware(...middleware)
    ));
    
    return store;
}



