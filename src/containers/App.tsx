import * as React from 'react';
import classes from '../scss/containers/App/App.scss';
import accordLogo from '../img/accord-logo.svg';

interface AppProps {
    project: string
}
export default class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div className={classes.App}>
                <div className={classes.Image}>
                    <img src={accordLogo} alt="accord-logo" />
                </div>
                <h1>Welcome to {this.props.project}</h1>
            </div>
        )
    }
}