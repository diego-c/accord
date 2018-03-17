import * as React from 'react';
import classes from '../scss/containers/App/App.scss';

interface AppProps {
    project: string
}
export default class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div className={classes.App}>
                <h1>Welcome to {this.props.project}</h1>
            </div>
        )
    }
}