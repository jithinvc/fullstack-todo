/**
 * Created by jithin on 26/12/19.
 */
//combinereducers here
import { combineReducers } from 'redux';
import todos from './todo.reducer';
import authentication from './authentication.reducer';

const rootReducer = combineReducers({ todos, authentication });

export default rootReducer