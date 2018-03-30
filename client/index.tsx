import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './redux/store/store';
import * as ReactRedux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';

const MainApp: React.SFC = props => (
    <ReactRedux.Provider store={store}>
        <App {...props} />
    </ReactRedux.Provider>
);

ReactDOM.render((
    <Router>
        <MainApp />
    </Router>
), document.getElementById('root'));