import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import App from './containers/App';

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));