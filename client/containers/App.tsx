import * as React from 'react';
import ConnectedMainLayout from '../components/MainLayout/MainLayout';
import { CssBaseline } from 'material-ui';
import { Route } from 'react-router';

class App extends React.Component<{}, {}> {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Route
                    path="/"
                    component={ConnectedMainLayout} />
            </React.Fragment>
        )
    }
}

export default App;