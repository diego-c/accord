import * as React from 'react';
import { ConnectedMainLayout } from '../components/MainLayout/MainLayout';
import { CssBaseline } from 'material-ui';

class App extends React.Component<{}, {}> {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <ConnectedMainLayout />
            </React.Fragment>
        )
    }
}

export default App;