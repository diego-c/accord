import * as React from 'react';
import { NavItem } from '../components/NavItem/NavItem';
import classes from '../scss/containers/Nav/Nav.scss';

interface NavState {
    isLoggedIn: boolean
}

interface NavProps<T> {
    children: Array<T>
}

export class Nav extends React.Component<NavProps<React.ReactChild>, NavState> {
    state = {
        isLoggedIn: false
    }

    render() {
        return (
            <div className={classes.Nav}>
                {this.props.children}
            </div>
        )
    }
}