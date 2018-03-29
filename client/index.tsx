import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './redux/store/store';
import * as ReactRedux from 'react-redux';
import App from './containers/App';

ReactDOM.render((
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>
), document.getElementById('root'));