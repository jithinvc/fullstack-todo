import React, {Component, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { divide } from 'lodash';

export default class Amp4EmailContainer extends Component {
	
	state = { value: ''}

	onChangeEmail = (e) => {
		this.setState({ value: e.target.value })
	}
	render() {
		return <Form.Row className="mb-2">
              <Col sm="12">
                <Form.Control
                    type="email"
                    onChange={this.onChangeEmail}
                    placeholder="add email"
                    size="sm"
                    value={this.state.value}
                />
              </Col>
            </Form.Row>
	}
}