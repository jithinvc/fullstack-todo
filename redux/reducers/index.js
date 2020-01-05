/**
 * Created by jithin on 26/12/19.
 */
//combinereducers here
import { combineReducers } from 'redux';
import todos from './todo.reducer';

const rootReducer = combineReducers({ todos });

export default rootReducer