import * as React from 'react';
import classes from '../scss/containers/App/App.scss';

interface AppProps {
    project: string
}
export default class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div className={classes.App}>
                <h1>Hello from {this.props.project}</h1>
                <p>ayy lmao!</p>
                <h2>p cool bro</h2>
                <h3>naisu desu</h3>
                <p>alright!</p>
            </div>
        )
    }
}