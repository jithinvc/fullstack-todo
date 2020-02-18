/**
 * Created by jithin on 29/01/20.
 */
/**
 * Created by jithin on 26/01/20.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { signUp } from '../redux/reducers/authentication.reducer';

import { SignUpModal } from '../components/SignUpModal'
//before component mounts check if user is logged in if so route to todos

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch)
}
const mapStateToProps = state => ({
  isUserLoggingIn: state.authentication.isUserLoggingIn,
  isUserLoggedIn: state.authentication.isUserLoggedIn,
  errorMessage: state.authentication.errorMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);