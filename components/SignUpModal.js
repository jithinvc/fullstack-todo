/**
 * Created by jithin on 29/01/20.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import noop from 'lodash/noop';


import './LoginModal.scss';

export const SignUpModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  /*const renderErrorMessages = () => {
    if (props.errorMessage) {
      return (
          <Alert variant="danger" className="mt-md-2">
            {props.errorMessage}
          </Alert>
      );
    }
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp(email, password, name);
  };

  //const redirectToSignUp = (e) => {
  //  props.history.push('/signup')
  //};

  return (
      <Modal show onHide={noop}>
        <Modal.Header>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  required
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              >
              </Form.Control>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>{props.isUserLoggingIn ?  '..Signing in': 'SignUp'}</Button>
        </Modal.Footer>
      </Modal>

  )
};
SignUpModal.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isUserLoggedIn: PropTypes.bool
};