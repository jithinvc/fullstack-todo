/**
 * Created by jithin on 26/12/19.
 */
import { createSelector } from 'reselect';
import _findIndex from 'lodash/findIndex';
import uuid from 'uuid';
import axios from '../../utils/httpClient';
import queryString from 'query-string';

/* Actions */
const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';
const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
const TOGGLE_TODO_ERROR = 'TOGGLE_TODO_ERROR';

const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
const ADD_TODO_ERROR = 'ADD_TODO_ERROR';

const UPDATE_QUERY_PARAMS = 'UPDATE_QUERY_PARAMS';
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';

export const getTodoState = state => state.todos;

export const toggleTodo = (id) => async (dispatch) => {
  try {
    await axios.put(`api/todo/togggle`, { id });
    dispatch({ type: TOGGLE_TODO_SUCCESS, payload: { id }})
  }
  catch (e) {
    dispatch({ type: TOGGLE_TODO_ERROR, erroText: 'toggle todo error'})
  }
};

export const updateQueryParams = (params) => async (dispatch) => {
  dispatch({type: UPDATE_QUERY_PARAMS, payload: params });
};

export const fetchtodos = (page) => async (dispatch, getState) => {
  const state = getState();
  const queryParams = state.todos.queryParams;
  //const query = state.todos.query;
  //const page
  dispatch({ type: FETCH_TODOS_REQUEST });
  try {
    const queryParamsString = queryString.stringify(queryParams);
    const data = await axios.get(`api/todo/getTodos?${queryParamsString}`);
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: { data: data.data.todos, count: data.data.numOfResults }})
  }
  catch (e) {
    dispatch({ type: FETCH_TODOS_ERROR, payload: { errorText: 'fetch todo error' }})
  }
};

export const addTodo = (text) => async (dispatch, getstate) => {
  dispatch({ type: ADD_TODO_REQUEST});
  try {
    const data = await axios.post('api/todo/addtodo', { text });
    dispatch({ type: ADD_TODO_SUCCESS, payload: {data: data.data} })
  }
  catch (e) {
    dispatch({ type: ADD_TODO_ERROR, payload: { errorText: 'loda lasoon' }})
  }
};

const initialState = {
  todos: [],
  queryParams: { query: '', page: 1 },
  hasMore: true
};

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    //created a paginated fetch todos api in node
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: state.queryParams.page === initialState.queryParams.page ? [...payload.data] : [...state.todos, ...payload.data ],
        queryParams: state.queryParams,
        hasMore: payload.count >= state.queryParams.page * 9
      };
    case FETCH_TODOS_ERROR:
      return state;
    case TOGGLE_TODO_SUCCESS:
      const index = _findIndex(state.todos, { '_id': payload.id });
      const todos = state.todos;
      const ourtodo = state.todos[index];
      return {
        ...state,
        todos: [ ...todos.slice(0, index), { ...ourtodo, 'done': !ourtodo.done }, ...todos.slice(index + 1)],
        queryParams: state.queryParams
      };
    case UPDATE_QUERY_PARAMS:
      return {
        ...state,
        todos: state.todos,
        queryParams: { ...state.queryParams, ...payload }
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.concat({ ...payload.data })
      };
    default:
      return state
  }
};
//connect redux in the app, and render todos