/**
 * Created by jithin on 05/01/20.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import queryString from 'query-string';
import history  from '../utils/history';

import constants from '../constants/constants'

/*
 todolist
 renders a list of todos todo is a component
 recieves list of todos from redux and renders them
 actions doneaction
 */
export const Todolist = (props) => {
  const onChangeTodoStatus = (id) => {
    props.onToggleTodo(id)
  };
  const handleScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const { hasMore, queryParams, updateQueryParams } = props;
    if (bottom && hasMore) {
      let query = { [constants.PAGE]: queryParams.page + 1 };
      updateQueryParams(query);
      history.push('todos', query);
      props.fetchtodos();
    }
  };
  //new function created everytime check
  return (<div className="toodList-container" onScroll={handleScroll}>
    {props.todos.map(val => (
        <Form.Row className="mb-2" key={val._id}>
          <Col sm="12">
            <Form.Check inline onChange={() => onChangeTodoStatus(val._id)} />
            <span className={cx({ 'todo-done': val.done })}>{val.text}</span>
          </Col>
        </Form.Row>
    ))}
  </div>)
};