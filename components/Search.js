/**
 * Created by jithin on 05/01/20.
 */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import history  from '../utils/history';
import queryString from 'query-string';

import constants from '../constants/constants'

/*
 recieves query
 actions updattesearch
 */
//try useState and dispatch hook
export const Search = (props) => {
  const { queryParams } = props;

  const onChangeSearch = (e) => {
    const query = { [constants.QUERY]: e.target.value };
    if (e.charCode === 13 || e.keyCode === 13) {
      query[constants.PAGE] = 1;
      props.updateQueryParams(query);
      history.push('todos', query);
      props.fetchtodos();
      return;
    }
    history.push('todos', query);
    props.updateQueryParams(query);
  };

  return (<Form.Control
      type="search"
      onKeyUp={onChangeSearch}
      placeholder="Search here"
      size="sm"
      defaultValue={queryParams.query}
  />)
};