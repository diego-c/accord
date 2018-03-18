import * as React from 'react';
import classes from '../scss/containers/App/App.scss';
import { Nav } from './Nav';
import { NavItem } from '../components/NavItem/NavItem';
import accordLogo from '../img/accord-logo.svg';

interface AppProps {
    project: string
}
export default class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <div className={classes.App}>
                <Nav>
                    <NavItem>
                        <img
                            src={accordLogo}
                            alt="accord-logo"
                            style={{ width: '5rem', height: '5rem', display: 'inline-block', marginRight: '1rem' }} />

                        <a href="#">Accord</a>
                    </NavItem>
                    <NavItem content="Login" />
                    <NavItem content="Sign Up" />
                </Nav>
                <h1>Welcome to {this.props.project}</h1>
            </div>
        )
    }
}