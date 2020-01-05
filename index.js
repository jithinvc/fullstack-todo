/**
 * Created by jithin on 23/12/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// main app
import App from './containers/App';
import store from './store';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));