import * as React from 'react';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { CssBaseline } from 'material-ui';

class App extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <CssBaseline />
                <MainLayout />
            </div>
        )
    }
}

export default App;