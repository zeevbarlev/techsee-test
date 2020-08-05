import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';


const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, createLogger())))



export default store
