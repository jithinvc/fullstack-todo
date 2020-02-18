/**
 * Created by jithin on 26/12/19.
 */
import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { toggleTodo, updateQueryParams, addTodo, fetchtodos, getTodoState } from '../redux/reducers/todo.reducer';
import { Search } from '../components/Search';
import { Todolist } from '../components/TodoList';
import './TodoPage.scss';
const QUERY = 'query';
const PAGE = 'page';
/*
 renders search and todolist
 recieves query and list of todos
 actions todo doneaction and updatesearch
 */
class TodoPage extends Component {
  state = {
    newtodo: ''
  };

  componentDidMount() {
    this.props.fetchtodos()
  }

  onAddTodo = (e) => {
    if (e.charCode === 13 || e.keyCode === 13) {
      //ask this nihar or some one
      const old_value = e.target.value;
      this.setState({newtodo: ''}, () => this.props.addTodo(old_value));
      return;
    }
    this.setState({ newtodo: e.target.value })
  };

  render() {
    const { todos, toggleTodo, updateQueryParams, fetchtodos, queryParams , hasMore } = this.props;
    return (<div className="todo-page-container">
          <h1 className="text-center">Todos</h1>
          <Form>
            <Form.Row className="mb-2">
              <Col sm="12">
              <Search queryParams={queryParams} updateQueryParams={updateQueryParams} fetchtodos={fetchtodos} />
              </Col>
            </Form.Row>
            <Todolist todos={todos} onToggleTodo={toggleTodo}
                      hasMore={hasMore} queryParams={queryParams}
                      updateQueryParams={updateQueryParams} fetchtodos={fetchtodos} />
            <Form.Row className="mb-2">
              <Col sm="12">
                <Form.Control
                    type="input"
                    onKeyUp={this.onAddTodo}
                    placeholder="add todo"
                    size="sm"
                    defaultValue={this.state.newtodo}
                />
              </Col>
            </Form.Row>
          </Form>
        </div>
    )
  }
}

const mapStateToProps = state => {
  const todos = getTodoState(state);
  return {
    todos: todos.todos,
    queryParams: todos.queryParams,
    hasMore: todos.hasMore
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleTodo, updateQueryParams, addTodo, fetchtodos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
