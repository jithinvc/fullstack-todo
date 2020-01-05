/**
 * Created by jithin on 26/12/19.
 */
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers'

const enhancers = [thunk];
if(!process.env.NODE_ENV !== 'production') {
  enhancers.push(createLogger())
}

export default createStore(rootReducer, applyMiddleware(...enhancers));