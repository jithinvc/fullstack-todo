/**
 * Created by jithin on 26/01/20.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


import './LoginModal.scss';

export const LoginModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const renderErrorMessages = () => {
    if (props.errorMessage) {
      return (
          <Alert variant="danger" className="mt-md-2">
            {props.errorMessage}
          </Alert>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(email, password);
  };

  const redirectToSignUp = (e) => {
    props.history.push('/signup')
  };

  return (
      <Modal show>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          <Button onClick={handleSubmit}>Login</Button>
          <Button variant="outline-primary" onClick={redirectToSignUp}>Don't have account?</Button>
        </Modal.Footer>
        {renderErrorMessages()}
      </Modal>

  )
};
LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isUserLoggedIn: PropTypes.bool
};