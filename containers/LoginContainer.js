/**
 * Created by jithin on 26/01/20.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { login } from '../redux/reducers/authentication.reducer';

import { LoginModal } from '../components/LoginModal'
//before component mounts check if user is logged in if so route to todos

function mapDispatchToProps(dispatch) {
  return bindActionCreators({login}, dispatch)
}
const mapStateToProps = state => ({
  isUserLoggingIn: true,
  isUserLoggedIn: state.authentication.isUserLoggedIn,
  errorMessage: state.authentication.errorMessage
});
connect(mapStateToProps, mapDispatchToProps);
export default (LoginModal)