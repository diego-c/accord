import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import './scss/globals/index.scss';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import App from './containers/App';

ReactDOM.render((
    <Provider store={store}>
        <App project="ReactApp" />
    </Provider>
), document.getElementById('root'));