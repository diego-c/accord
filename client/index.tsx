import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './redux/store/store';
import * as ReactRedux from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './containers/App';

ReactDOM.render((
    <ReactRedux.Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </ReactRedux.Provider>
), document.getElementById('root'));